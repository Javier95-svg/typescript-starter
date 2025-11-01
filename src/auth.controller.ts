import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { signUp, signIn, AuthCredentials } from '../../libs/shared/supabase';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() credentials: AuthCredentials) {
    const result = await signUp(credentials);

    if (!result.success) {
      throw new HttpException(
        result.error || 'Registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'User registered successfully',
      user: result.user,
      session: result.session,
    };
  }

  @Post('login')
  async login(@Body() credentials: AuthCredentials) {
    const result = await signIn(credentials);

    if (!result.success) {
      throw new HttpException(
        result.error || 'Login failed',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      message: 'User logged in successfully',
      user: result.user,
      session: result.session,
    };
  }
}
