import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js frontend URL
    credentials: true,
  });
  
  await app.listen(8000); // Use different port than frontend
}
bootstrap();