import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailServiceModule } from "./modules/mail-service/mail.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
