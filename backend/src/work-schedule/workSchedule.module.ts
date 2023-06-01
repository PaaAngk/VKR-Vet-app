import { Module } from '@nestjs/common';
import { WorkScheduleResolver } from './workSchedule.resolver';

@Module({
  imports: [],
  providers: [WorkScheduleResolver],
})
export class WorkScheduleModule {}
