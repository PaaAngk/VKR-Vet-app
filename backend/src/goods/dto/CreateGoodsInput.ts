import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGoodsInput {
  @Field()
  @IsNotEmpty()
  categoryId?: number;

  @Field()
  @IsNotEmpty()
  name?: string;

  @Field()
  @IsNotEmpty()
  measure?: string;

  @Field()
  @IsNotEmpty()
  quantity?: number;

  @Field()
  @IsNotEmpty()
  price?: number;
}
