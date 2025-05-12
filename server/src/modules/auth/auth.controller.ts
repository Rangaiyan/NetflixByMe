import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Signin, Signup } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: Signup) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() longinDto: Signin) {
    return this.authService.login(longinDto);
  }
}
