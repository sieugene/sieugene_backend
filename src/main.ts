import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { createAdminScript } from './shared/scripts/create-admin.script';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Try connect for database
  const prismaClient = app.get(PrismaService);
  await prismaClient.$connect();
  // Execute Create admin script

  await createAdminScript();

  await app.listen(3000);
}
bootstrap();
