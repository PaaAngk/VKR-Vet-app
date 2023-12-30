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
import { Req, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateGoodsInput } from './dto/CreateGoodsInput';
import { Goods } from './models/goods.model';
import { UpdateGoodsInput } from './dto/UpdateGoodsInput';
import { GoodsCategory } from './models/goods-category.model';
import { Header } from 'src/common/decorators/header.decorator';
import { Department } from '.prisma/client';
// import { Department } from 'src/common/models/department.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Goods)
export class GoodsResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Goods)
  async createGoods(
    @Args('data') data: CreateGoodsInput,
    @Header('department') department?: string
  ) {
    const newGoods = await this.prisma.goods.create({
      data: {
        categoryId: data.categoryId,
        name: data.name.trim(),
        measure: data.measure || null,
        quantity: data.quantity || null,
        price: data.price || null,
        department: department as Department,
      },
    });
    return newGoods;
  }

  @Mutation(() => Goods)
  async updateGoods(
    @Args({ name: 'goodsId', type: () => Int }) goodsId: number,
    @Args('data') newGoodsData: UpdateGoodsInput
  ) {
    return await this.prisma.goods.update({
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
    return await this.prisma.goods.delete({
      where: {
        id: goodsId,
      },
    });
  }

  @Query(() => [Goods])
  async allGoods(@Header('department') department?: string) {
    // console.log(department, Department[department]);
    return await this.prisma.goods.findMany({
      where: { department: department as any },
    });
  }

  @ResolveField('category', () => GoodsCategory)
  async GoodsCategory(@Parent() goods: Goods) {
    return this.prisma.goodsCategory.findUnique({
      where: { id: goods.categoryId },
    });
  }
}
