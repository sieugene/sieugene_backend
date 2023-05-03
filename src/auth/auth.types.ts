import { User } from '@prisma/client';

export type JwtReqPayloadUser = Pick<User, 'username'> & {
  sub: User['userId'];
};

export type JwtReqUser = Omit<User, 'password'>;
