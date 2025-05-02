import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/allexceptionfilter.filter';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule)
  app.enableCors(); 
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// api flow 
// code base structured
// module,
