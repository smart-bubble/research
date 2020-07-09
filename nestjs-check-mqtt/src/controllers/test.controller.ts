import { Controller } from '@nestjs/common';
import { MessagePattern, MqttContext, Ctx, Payload } from '@nestjs/microservices';

@Controller()
export class TestController {
  @MessagePattern("mqtttest/#")
  Consoletest(@Payload() data: string, @Ctx() context: MqttContext) {
    console.log(data);
    console.log(context.getTopic());
  }
}