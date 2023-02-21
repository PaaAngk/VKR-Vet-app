import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GoodsCategory } from './goods-category.model';
import { GoodsList } from './goods-list.model';

@ObjectType()
export class Goods {
  @Field(() => Int)
  id: number;

  @Field(() => GoodsCategory, { nullable: true })
  category?: GoodsCategory;

  @Field(() => [GoodsList])
  GoodsList?: GoodsList[];

  @Field(() => Int)
  categoryId?: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  measure?: string;

  @Field(() => Float)
  quantity?: number;

  @Field(() => Float)
  price?: number;
}
