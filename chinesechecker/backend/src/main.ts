import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Chinese checker API documentation')
    .setDescription('Tek4\'s chinese checker api')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer'
    }, 'access-token')
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
