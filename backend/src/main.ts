import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { whitelist } from 'validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  }
  );
}
bootstrap();
