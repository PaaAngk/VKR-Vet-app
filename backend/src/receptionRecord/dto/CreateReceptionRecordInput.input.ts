import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReceptionRecordInput {
  @Field()
  clientId?: string;

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

  @IsString()
  kindOfAnimal?: string;
}