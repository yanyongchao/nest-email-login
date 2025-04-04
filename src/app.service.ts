import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    console.log(this.configService.get('email').username);
    console.log(this.configService.get('email').password);
    return 'Hello World!';
  }
}
