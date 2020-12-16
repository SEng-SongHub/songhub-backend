import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  if (!fs.existsSync('db.json')) {
    fs.writeFileSync('db.json', '');
  }
  await app.listen(process.env.PORT || 5000)
}



bootstrap()
