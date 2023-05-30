import { IsDate, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReceptionRecordInput {
  @Field()
  clientId?: number;

  @Field()
  employeeId?: number;

  @Field()
  receptionPurposeId?: number;

  @IsDate()
  @IsNotEmpty()
  dateTimeStart: Date;

  @IsDate()
  @IsNotEmpty()
  dateTimeEnd: Date;

  @Field()
  kindOfAnimal?: string;
}
