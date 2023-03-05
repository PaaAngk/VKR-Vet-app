import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateGoodsInput } from './dto/CreateGoodsInput';
import { Goods } from './models/goods.model';
import { UpdateGoodsInput } from './dto/UpdateGoodsInput';
import { GoodsCategory } from './models/goods-category.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Goods)
export class GoodsResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Goods)
  async createGoods(@Args('data') data: CreateGoodsInput) {
    const newGoods = this.prisma.goods.create({
      data: {
        categoryId: data.categoryId,
        name: data.name.trim(),
        measure: data.measure || null,
        quantity: data.quantity || null,
        price: data.price || null,
      },
    });
    return newGoods;
  }

  @Mutation(() => Goods)
  async updateGoods(
    @Args({ name: 'goodsId', type: () => Int }) goodsId: number,
    @Args('data') newGoodsData: UpdateGoodsInput
  ) {
    return this.prisma.goods.update({
      data: newGoodsData,
      where: {
        id: goodsId,
      },
    });
  }

  @Mutation(() => Goods)
  async deleteGoods(
    @Args({ name: 'goodsId', type: () => Int }) goodsId: number
  ) {
    return this.prisma.goods.delete({
      where: {
        id: goodsId,
      },
    });
  }

  @Query(() => [Goods])
  async allGoods() {
    return await this.prisma.goods.findMany();
  }

  @ResolveField('category', () => GoodsCategory)
  async GoodsCategory(@Parent() goods: Goods) {
    return this.prisma.goodsCategory.findUnique({
      where: { id: goods.categoryId },
    });
  }
}
