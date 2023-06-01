import { IsDate, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkScheduleInput {
  @Field()
  @IsNotEmpty()
  employeeId: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
