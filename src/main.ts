import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: "localhost",
      port: 6379,
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://hienanh:admin@localhost:5672"],
      queue: "mail_queue",
      noAck: false,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
