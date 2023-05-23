import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AnalyticsService } from './analytics.service';
import { BetweenDateInput } from 'src/receptionRecord/dto/BetweenDateInput.input';
import { Statistic, StatisticByDates } from './models/analytics';

@Controller('analytics')
export class AnalyticsController {
  constructor(private prisma: PrismaService) {}

  /**
   * Select statistic (sum of earn, count of clients and pets(unique)) to today an yesteday
   * @param res
   */
  @Get('analytics')
  async receptionsStatistic(@Res() res) {
    const dates: Date[] = [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() - 1)),
    ];
    const result: Statistic[] = [];
    for (const date of dates) {
      result.push(
        await this.prisma.$queryRawUnsafe(`SELECT 
          SUM("cost") as cost_sum, 
          cast(COUNT(distinct public."Client"."id") as integer) as unique_client, 
          cast(count(distinct "petId") as integer) as unique_pets
        FROM public."Reception" 
        LEFT JOIN public."Pet" ON public."Pet"."id" = "petId"
        LEFT JOIN public."Client" on  public."Client"."id" = "clientId"
        WHERE public."Reception"."createdAt"::date = '${date.toDateString()}'`)
      );
    }
    console.log(result);
    res.json(result);
  }

  /**
   * Convert docx document to pdf extension
   */
  @Post('analytics-by-dates')
  async receptionsStatisticByDates(@Body() data: BetweenDateInput, @Res() res) {
    const result: StatisticByDates = await this.prisma.$queryRawUnsafe(`SELECT 
          DATE_TRUNC('day', public."Reception"."createdAt") as date, SUM("cost") as cost_sum, 
          cast(COUNT(distinct public."Client"."id") as integer) as unique_client, 
          cast(count(distinct "petId") as integer) as unique_pets
        FROM public."Reception" 
        LEFT JOIN public."Pet" ON public."Pet"."id" = "petId"
        LEFT JOIN public."Client" on  public."Client"."id" = "clientId"
        where public."Reception"."createdAt" BETWEEN '${
          data.dateStart
        }' and '${addDays(data.dateEnd, 1).toDateString()}'
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
// SELECT
// 	DATE_TRUNC('day', public."Reception"."createdAt") as date, SUM("cost") as cost_sum,
// 	cast(COUNT(distinct public."Client"."id") as integer) as unique_client,
//cast(count(distinct "petId") as integer) as unique_pets
// FROM public."Reception"
// LEFT JOIN public."Pet" ON public."Pet"."id" = "petId"
// LEFT JOIN public."Client" on  public."Client"."id" = "clientId"
// where public."Reception"."createdAt" BETWEEN '2023-01-12' and '2023-06-01'
// GROUP BY DATE_TRUNC('day', public."Reception"."createdAt")
// ORDER BY date
