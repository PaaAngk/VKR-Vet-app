import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddInGoodsListInput {
  @Field()
  @IsNotEmpty()
  receptionId?: string;

  @Field()
  @IsNotEmpty()
  goodsId?: number;

  @Field()
  @IsNotEmpty()
  quantity?: number;
}
