import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(user: any, token: string) {
    try {
      const res = await this.mailerService.sendMail({
        to: user.email,
        from: '"CourseIo Team" <help@courseio.com>', // override default from
        subject: "Welcome to Nice App! Confirm your Email",
        template: "./confirmation", // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.userName,
          otpCode: token,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
