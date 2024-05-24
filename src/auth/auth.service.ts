import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { ResendOtpDto, VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, firstname, lastname, password1 } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Account already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password1, salt);

    const otp = uuidv4().split('-')[0];
    const otpExpires = moment().add(5, 'minute').toDate();

    const user = await this.usersRepository.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await this.usersRepository.save(user);

    //email integration
    console.log('Your OTP CODE IS: ',otp)

    return { message: 'User registered. Check your email(console) for verification code.' };;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid email or OTP');
    }

    if (user.isVerified) {
      throw new BadRequestException('User already verified');
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await this.usersRepository.save(user);
    
    return { message: 'User verified successfully' };
}

async generateOtp(otpDto: ResendOtpDto) {
    const { email } = otpDto;
    
    // Check if the email already exists
    const existingUser = await this.usersRepository.findOne({
        where: { email },
    });
    
    if (!existingUser) {
        throw new NotFoundException('User does not exist');
    }
    
    if (existingUser.isVerified) {
        throw new BadRequestException('User already verified');
    }
    
    const otp = uuidv4().split('-')[0];
    const otpExpires = moment().add(5, 'minute').toDate();
    
    existingUser.otp = otp;
    existingUser.otpExpires = otpExpires;
    
    await this.usersRepository.save(existingUser);

    // email integration here
    console.log('Your OTP CODE IS: ',otp)

    return { message: 'OTP generated successfully' };

  }
}
