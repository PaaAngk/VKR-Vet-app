import { Body, Controller, Post, Res } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AnalyticsService } from './analytics.service';
import { BetweenDateInput } from 'src/receptionRecord/dto/BetweenDateInput.input';
import { StatisticByDates } from './models/analytics';

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
  async receptionsStatisticByDates(
    @Body() data: BetweenDateInput,
    @Res({ passthrough: true }) res
  ) {
    const result: StatisticByDates = await this.prisma.$queryRawUnsafe(`SELECT 
          DATE_TRUNC('day', public."Reception"."createdAt") as date, SUM("cost") as cost_sum, 
          cast(COUNT(distinct public."Client"."id") as integer) as unique_client, 
          cast(count(distinct "petId") as integer) as unique_pets
        FROM public."Reception" 
        LEFT JOIN public."Pet" ON public."Pet"."id" = "petId"
        LEFT JOIN public."Client" on  public."Client"."id" = "clientId"
        where public."Reception"."createdAt" BETWEEN '${data.dateStart}' and '${addDays(data.dateEnd, 1).toDateString()}'
        GROUP BY DATE_TRUNC('day', public."Reception"."createdAt")
        ORDER BY date`);
    // console.log(addDays(data.dateEnd, 1));
    // console.log(result);
    res.json(result);
  }
}
function addDays(date, days): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
// `SELECT DATE_TRUNC('day', "createdAt") as date, SUM("cost")
// FROM public."Reception"
// where "createdAt" BETWEEN '${data.dateStart}' and '${addDays(data.dateEnd, 1).toDateString()}'
// GROUP BY DATE_TRUNC('day', "createdAt")
// ORDER BY date`
// SELECT DATE_TRUNC('day', "createdAt") as date, SUM("cost")
//   FROM public."Reception"
//   where "createdAt" BETWEEN '2023-01-12' and '2023-06-01'
//   GROUP BY DATE_TRUNC('day', "createdAt")
//   ORDER BY date
