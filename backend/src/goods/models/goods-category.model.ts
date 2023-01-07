import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Goods } from './goods.model';

@ObjectType()
export class GoodsCategory {
  @Field(() => Int)
  id?: number;

  @Field(() => [Goods])
  goods?: Goods[];

  @Field(() => String)
  categoryName?: string;
}
