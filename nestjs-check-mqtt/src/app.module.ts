import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/environments/config.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TestController } from 'src/controllers/test.controller';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
