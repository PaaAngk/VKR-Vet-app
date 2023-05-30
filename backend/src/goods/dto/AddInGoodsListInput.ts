import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class AddInGoodsListInput {
  @Field()
  @IsNotEmpty()
  receptionId?: number;

  @Field()
  @IsNotEmpty()
  goodsId?: number;

  @Field(() => Float)
  @IsNotEmpty()
  quantity?: number;
}
