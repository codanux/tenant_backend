import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('market example')
  .setDescription('The market API description')
  .setVersion('1.0')
  .addTag('market')
  .addGlobalParameters({
    in: 'header',
    required: false,
    name: 'tenant',
    schema: {
      example: 'codanux',
    },
  })
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          [error.property]: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      
    })
  );
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
