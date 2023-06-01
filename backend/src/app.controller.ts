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
    return await this.prisma.$queryRaw`
      SELECT DATE_TRUNC('day', "createdAt") as date, SUM("cost")
      FROM public."Reception"
      where "createdAt" BETWEEN '2023-01-12' and '2023-06-01'
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY date
    `;
  }

  @Get('test')
  async test() {
    const res = await this.prisma.schedule.createMany({
      data: [
        {
          employeeId: 1,
          date: '2023-06-01T16:00:00.000Z',
        },
        {
          employeeId: 1,
          date: '2023-06-01T16:00:00.000Z',
        },
      ],
    });

    return JSON.stringify(res);
  }
}
