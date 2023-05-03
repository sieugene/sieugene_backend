import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Try connect for database
  const prismaClient = app.get(PrismaService);
  await prismaClient.$connect();

  await app.listen(3000);
}
bootstrap();
