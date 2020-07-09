import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TestController {
  @MessagePattern("mqtttest")
  Consoletest(data: string) {
    console.log(data);
  }
}