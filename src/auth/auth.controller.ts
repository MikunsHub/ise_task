import { Request } from 'express';
import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login-user.dto';
import { ResendOtpDto, VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.createUser(createUserDto);
    return newUser;
  }

  @Post('verify')
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyUser(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('resend-otp')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resendOtpCode(@Body() resendOtpDto: ResendOtpDto) {
    return this.authService.generateOtp(resendOtpDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(@Body() loginDto: LoginDto, @Req() request: Request) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.authService.sendLoginOtp(user,request);
    return {
      message: 'OTP sent to your email. Please verify to complete login.',
    };
  }

  @Post('verify-login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyLogin(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.verifyLoginOtp(sendOtpDto);
  }
}
