import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  // app.enableVersioning({
  //   type: APP_HEADER
  // });

  const corsOptions: CorsOptions = {
    origin: true, // or provide a specific list of allowed origins ['http://localhost:3000', 'https://yourdomain.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  // Enable CORS using the middleware
  app.enableCors(corsOptions);
  
  await app.listen(8080);
}
bootstrap();
