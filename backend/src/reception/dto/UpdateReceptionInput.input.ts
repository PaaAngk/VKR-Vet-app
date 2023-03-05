import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';
import { GoodsListReceptionInput } from './GoodsListReceptionInput.input';
import { ServiceListReceptionInput } from './ServiceListReceptionInput.input';

@InputType()
export class UpdateReceptionInput {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsInt()
  @IsNotEmpty()
  purposeId: number;

  @IsString()
  clinicalSigns?: string;

  @IsString()
  anamnesis?: string;

  @IsString()
  diagnosis?: string;

  @IsString()
  assignment?: string;

  @Field(() => Float)
  cost?: number;

  @IsArray()
  goodsListReceptionInput?: GoodsListReceptionInput[];

  @IsArray()
  serviceListReceptionInput?: ServiceListReceptionInput[];
}
