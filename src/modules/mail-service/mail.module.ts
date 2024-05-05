import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        isGlobal: true, // import module globally
        transport: {
          host: config.get("MAIL_HOST"),
          secure: false,
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get("MAIL_FROM")}>`,
        },
        template: {
          dir: "src/assets/templates",
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailServiceModule {}
