import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { JwtReqPayloadUser, JwtReqUser } from '../auth.types';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const payload = request?.cookies || request?.headers;
          const token = payload?.Authentication || payload?.authentication;

          if (!token) {
            const tokenFromHeaders =
              ExtractJwt.fromAuthHeaderAsBearerToken()(request);
            return tokenFromHeaders;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtReqPayloadUser): Promise<JwtReqUser> {
    const { password, ...user } = await this.userService.findOne(
      payload.username,
    );
    return user;
  }
}
