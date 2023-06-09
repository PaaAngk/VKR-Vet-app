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

  @Get('allEmp')
  async getAllEmplooyee() {
    return await this.prisma.employee.deleteMany();
  }

  @Get('test')
  async test() {
    const res = await this.prisma.reception.createMany({
      data: {
        anamnesis: '123',
        assignment: '213',
        clinicalSigns: '123',
        cost: 12.3,
        diagnosis: '555555',
        discount: 1,
        employeeId: 1,
        petId: 7,
        purposeId: 1,
      },
    });

    return JSON.stringify(res);
  }
}
