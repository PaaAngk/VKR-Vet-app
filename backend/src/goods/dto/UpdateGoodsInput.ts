import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class UpdateGoodsInput {
  @Field()
  @IsNotEmpty()
  name?: string;

  @Field(() => Float)
  @IsNotEmpty()
  price?: number;

  @Field(() => Float)
  @IsNotEmpty()
  quantity?: number;
}
