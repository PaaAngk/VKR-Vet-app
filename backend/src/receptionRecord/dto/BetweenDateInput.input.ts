import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class BetweenDateInput {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateStart: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateEnd: Date;
}
