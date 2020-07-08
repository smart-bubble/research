import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'enviroments/config.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from 'enviroments/config.service';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
