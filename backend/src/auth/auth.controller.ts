import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_dto, Signup_dto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: Signup_dto) {
    return this.AuthService.signup(dto);
  }

  @Post('/login')
  login(@Body() dto: Login_dto) {
    return this.AuthService.login(dto);
  }
}
