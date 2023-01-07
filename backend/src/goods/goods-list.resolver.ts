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
import { AddInGoodsListInput } from './dto/AddInGoodsListInput';
import { GoodsList } from './models/goods-list.model';
import { Goods } from './models/goods.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => GoodsList)
export class GoodsListResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => GoodsList)
  async addInGoodsList(@Args('data') data: AddInGoodsListInput) {
    return this.prisma.goodsList.create({
      data: {
        receptionId: data.receptionId,
        goodsId: data.goodsId,
        quantity: data.quantity,
      },
    });
  }

  @Query(() => [GoodsList])
  async allGoodsList() {
    return await this.prisma.goodsList.findMany();
  }

  @ResolveField('goods', () => Goods)
  async goods(@Parent() goodsList: GoodsList) {
    return this.prisma.goods.findUnique({
      where: { id: goodsList.goodsId },
    });
  }
}
