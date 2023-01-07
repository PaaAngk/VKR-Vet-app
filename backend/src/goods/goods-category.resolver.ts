import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateGoodsCategoryInput } from './dto/CreateGoodsCategoryInput';
import { Goods } from './models/goods.model';
import { GoodsCategory } from './models/goods-category.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => GoodsCategory)
export class GoodsCategoryResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => GoodsCategory)
  async createGoodsCategory(@Args('data') data: CreateGoodsCategoryInput) {
    return this.prisma.goodsCategory.create({
      data: {
        categoryName: data.categoryName,
      },
    });
  }

  @Query(() => [GoodsCategory])
  async allGoodsCategory() {
    return await this.prisma.goodsCategory.findMany();
  }

  @ResolveField('goods', () => [Goods])
  async goods(@Parent() goodsCategory: GoodsCategory) {
    return this.prisma.goods.findMany({
      where: { categoryId: goodsCategory.id },
    });
  }
}
