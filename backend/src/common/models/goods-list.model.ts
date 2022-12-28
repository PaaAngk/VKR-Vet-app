import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Reception } from 'src/reception/models/reception.model';
import { Goods } from './goods.model';

@ObjectType()
export class GoodsList {
  @Field(() => Reception)
  Reception?: Reception;

  @Field(() => Goods)
  Goods?: Goods;

  @Field(() => String)
  receptionId: string;

  @Field(() => Int)
  goodsId: number;

  @Field(() => Float)
  quantity: number;
}
