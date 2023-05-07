import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class ReceptionRecordBetweenDateArgs {
  @IsNotEmpty()
  dateStart: Date;
  @IsNotEmpty()
  dateEnd: Date;
}
