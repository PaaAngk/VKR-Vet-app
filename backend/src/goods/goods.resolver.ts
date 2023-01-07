import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateGoodsInput } from './dto/CreateGoodsInput';
import { Goods } from './models/goods.model';

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

  @Query(() => [Goods])
  async allGoods() {
    return await this.prisma.goods.findMany();
  }

  // @ResolveField('type', () => ServiceType)
  // async serviceType(@Parent() service: Service) {
  //   return this.prisma.serviceType.findUnique({
  //     where: { id: service.typeId },
  //   });
  // }

  // @ResolveField('services', () => [ServiceList])
  // async serviceLists(@Parent() service: Service) {
  //   return this.prisma.serviceList.findMany({
  //     where: { serviceId: service.id },
  //   });
  // }
}
