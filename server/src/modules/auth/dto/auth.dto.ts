import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class Signup {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  password: string;
}

export class Signin {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
