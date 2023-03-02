import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class UpdateGoodsInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2)
  name?: string;

  @Field(() => Float)
  @IsNotEmpty()
  price?: number;

  @Field(() => Float)
  @IsNotEmpty()
  quantity?: number;

  // @Field(() => Int)
  // @IsNotEmpty()
  // categoryId?: number;
}
