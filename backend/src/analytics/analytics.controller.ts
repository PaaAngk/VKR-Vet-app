import { Body, Controller, Post, Res } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AnalyticsService } from './analytics.service';
import { BetweenDateInput } from 'src/receptionRecord/dto/BetweenDateInput.input';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private prisma: PrismaService
  ) {}

  /**
   * Convert docx document to pdf extension
   */
  @Post('receptions-earn-by-dates')
  async receptionsEarnByDates(
    @Body() data: BetweenDateInput,
    @Res({ passthrough: true }) res
  ) {
    // if (data) {
    // const result = await this.prisma.reception.groupBy({
    //   by: ['createdAt'],
    //   where: {
    //     AND: [
    //       {
    //         createdAt: { lte: data.dateEnd },
    //       },
    //       {
    //         createdAt: { gte: data.dateStart },
    //       },
    //     ],
    //   },
    //   _sum: {
    //     cost: true,
    //   },
    // });
    const result = await this.prisma.$queryRaw`
        SELECT date_trunc('month', '2023-05-16') month,
        sum(cost) amount_by_month FROM Reception group by 1;`;
    console.log(result);
    res.json(result);
    // } else {
    //   throw new HttpException('don`t has date', HttpStatus.LENGTH_REQUIRED);
    // }
  }
}
