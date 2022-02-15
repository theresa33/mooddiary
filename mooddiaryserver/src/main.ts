import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000).then((data) => {
    console.log('Backend running on port 3000');
  });
}
bootstrap();