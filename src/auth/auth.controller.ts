import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Request as RequestExpress } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { JwtReqUser } from './auth.types';

import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() createCatDto: AuthLoginDto,
    @Req() req: RequestExpress & { body: AuthLoginDto },
  ) {
    const { access_token, cookie } = await this.authService.login(req.body);
    req.res.setHeader('Set-Cookie', cookie);
    return { access_token };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: JwtReqUser }) {
    return req.user;
  }
}
