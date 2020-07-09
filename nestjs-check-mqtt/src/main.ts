import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from './environments/config.service';

async function bootstrap() {
  const config = new ConfigService(process.env.NODE_ENV);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url:"mqtt://"+config.get('MQTT_HOST')+":"+config.get('MQTT_PORT'),
        username: config.get('MQTT_USERNAME'),
        password: config.get('MQTT_PASSWORD'),
      },
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();