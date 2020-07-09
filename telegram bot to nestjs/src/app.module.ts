import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './environments/config.module';
import { ConfigService } from './environments/config.service';

@Module({
  imports: [ConfigModule,],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
