import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/event/user-created.event';
@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('email').username,
        pass: this.configService.get('email').password,
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: this.configService.get('email').username,
      },
      to,
      subject,
      html,
    });
  }

  @OnEvent('user.created')
  handleUserCreated(event: UserCreatedEvent) {
    console.log(`📩 发送邮件给用户: ${event.email}`);
  }
}
