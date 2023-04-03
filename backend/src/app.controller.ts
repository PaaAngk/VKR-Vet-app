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
    return await this.prisma.service.findMany();
  }
}
