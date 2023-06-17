import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { GoodsListReceptionInput } from './GoodsListReceptionInput.input';
import { ServiceListReceptionInput } from './ServiceListReceptionInput.input';

@InputType()
export class CreateReceptionInput {
  @IsInt()
  @IsNotEmpty()
  petId: number;

  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsInt()
  @IsNotEmpty()
  purposeId: number;

  @IsString()
  @IsOptional(null)
  clinicalSigns?: string;

  @IsString()
  @IsOptional(null)
  anamnesis?: string;

  @IsString()
  @IsOptional(null)
  diagnosis?: string;

  @IsString()
  @IsOptional(null)
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
