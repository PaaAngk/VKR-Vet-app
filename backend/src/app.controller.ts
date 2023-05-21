import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name);
  }

  @Get('servicesByType')
  async getServicesByType() {
    // return await this.prisma.$queryRaw`
    // SELECT date_trunc('day', '2023-05-16') month,
    // sum(cost) amount_by_month FROM Reception group by 1;`;
    return await this.prisma.$queryRaw`SELECT * FROM reception
      where start_date between '2023-01-01' and '2023-09-13'`;
  }
}
