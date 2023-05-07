import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReceptionRecordInput {
  @IsString()
  clientId?: string;

  @IsInt()
  employeeId?: number;

  @IsInt()
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
