import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GoodsCategory } from './goods-category.model';
import { GoodsList } from './goods-list.model';

@ObjectType()
export class Goods {
  @Field(() => Int)
  id: number;

  @Field(() => GoodsCategory)
  GoodsCategory?: GoodsCategory;

  @Field(() => [GoodsList], { nullable: 'items' })
  GoodsList?: GoodsList[] | null;

  @Field(() => Int)
  categoryId: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  measure?: string;

  @Field(() => Float, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  price?: number;
}
