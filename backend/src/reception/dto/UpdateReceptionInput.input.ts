import { IsArray, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';
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

  @Field(() => String, { nullable: true })
  clinicalSigns?: string;

  @Field(() => String, { nullable: true })
  anamnesis?: string;

  @Field(() => String, { nullable: true })
  diagnosis?: string;

  @Field(() => String, { nullable: true })
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
