import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from './environments/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url:"mqtt://"+process.env.MQTT_HOST+":"+process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
      },
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();