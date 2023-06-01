import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class WorkScheduleCreateArgs {
  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  date: Date;
}
