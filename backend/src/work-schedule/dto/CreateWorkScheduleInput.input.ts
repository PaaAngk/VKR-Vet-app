import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateWorkScheduleInput {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsDate()
  @IsNotEmpty()
  dateWorkStart: Date;

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, {
    nullable: false,
    description: 'Количество дней для создания графика.',
  })
  workDays: number;
}
