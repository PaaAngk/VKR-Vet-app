import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { GoodsListReceptionInput } from './GoodsListReceptionInput.input';
import { ServiceListReceptionInput } from './ServiceListReceptionInput.input';

@InputType()
export class CreateReceptionInput {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  petId: number;

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

  @Field(() => Int)
  @Min(0)
  @Max(100)
  discount?: number;

  @IsArray()
  goodsListReceptionInput?: GoodsListReceptionInput[];

  @IsArray()
  serviceListReceptionInput?: ServiceListReceptionInput[];
}
