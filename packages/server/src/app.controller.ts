import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { STS } from 'ali-oss';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() res: Response) {
    // 🌸 配置oss
    console.log(123);

    const sts = new STS({
      accessKeyId: 'LTAI5tCnEve3dEbTiVWWQtph',
      accessKeySecret: '39dg5pVlLXbH6wAZjQmbYYvjMEz15i',
    });
    const result = await sts.assumeRole(
      ':ram::1057778667542355:role/full-featured-test',
      ``,
      '3000',
      'sessiontest',
    );
    res.json(result);
    return result;
  }
}
