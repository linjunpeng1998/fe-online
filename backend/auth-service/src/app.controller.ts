import { Body, Controller, Post } from '@nestjs/common';
import { AppService, LoginVo } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login') // 统一登陆接口
  async login(@Body() vo: LoginVo): Promise<{ token: string; userInfo: LoginVo }> {
    const token = await this.appService.sign(vo); // 生成 token
    const userInfo = await this.appService.getInfo(token); // 获取用户信息
    return { token, userInfo }; // 返回 token 和用户信息给前端
  }
}
