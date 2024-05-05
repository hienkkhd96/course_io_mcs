import { Controller } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MessagePattern } from "@nestjs/microservices";
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
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    if (!data?.user) {
      return;
    }
    return this.mailService.sendUserConfirmation(data.user, data.token);
  }
}
