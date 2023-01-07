import { Module } from '@nestjs/common';
import { GoodsResolver } from './goods.resolver';
import { GoodsCategoryResolver } from './goods-category.resolver';
import { GoodsListResolver } from './goods-list.resolver';

@Module({
  imports: [],
  providers: [GoodsResolver, GoodsCategoryResolver, GoodsListResolver],
})
export class GoodsModule {}
