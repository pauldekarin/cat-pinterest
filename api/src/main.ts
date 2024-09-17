import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors:true
  });
  const config = await app.get(ConfigService);
  const port = 3000;

  app.enableCors({
    origin: `*`,
    methods: 'GET, POST, DELETE, HEAD, PATCH, PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Auth-Token',
    exposedHeaders: 'X-Auth-Token',
    credentials:true
  });

  await app.listen(port, () => {
    console.log(`App Started on Port: ${port}`);
  });
}
bootstrap();
