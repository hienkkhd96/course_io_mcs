import { Controller } from "@nestjs/common";
import { MailService } from "./mail.service";
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
@Controller("mail")
export class MailController {
  constructor(private mailService: MailService) {}
  @MessagePattern("send_mail")
  sendMail(data: {
    user: {
      email: string;
      userName: string;
    };
    token: string;
  }) {
    if (!data?.user) {
      return;
    }
    return this.mailService.sendUserConfirmation(data.user, data.token);
  }
  @EventPattern("notifications")
  sendNotification(
    @Payload() data: Record<string, any>,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }
}
