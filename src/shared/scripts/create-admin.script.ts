import { UsersService } from '../../users/users.service';

import { NestFactory } from '@nestjs/core';
import { UsersModule } from '../../users/users.module';

export async function createAdminScript() {
  const application = await NestFactory.createApplicationContext(UsersModule);
  const usersService = application.get(UsersService);
  const admin = await usersService.findOne('admin');
  if (!admin) {
    console.log('createAdminScript start');
    await usersService.create({
      username: 'admin',
      password: process.env.SUPER_USER_PASSWORD,
    });
    console.log('Users was created');
    console.log('createAdminScript end');
  }

  await application.close();
}
