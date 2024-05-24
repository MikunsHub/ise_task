// src/auth/dto/verify-otp.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}

export class ResendOtpDto {
    @IsEmail()
    email: string;
  }