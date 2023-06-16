import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Mutation,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Service } from './models/service.model';
import { CreateServiceInput } from './dto/CreateServiceInput';
import { ServiceType } from './models/service-type.model';
import { UpdateServiceInput } from './dto/UpdateServiceInput';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@UseGuards(GqlAuthGuard)
@Resolver(() => Service)
export class ServiceResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Service)
  async createService(@Args('data') data: CreateServiceInput) {
    const newService = this.prisma.service.create({
      data: {
        typeId: data.typeId,
        name: data.name.trim() || null,
        price: data.price,
      },
    });
    pubSub.publish('serviceAdded', { serviceAdded: newService });
    return newService;
  }

  @Subscription(() => Service)
  serviceAdded() {
    return pubSub.asyncIterator('serviceAdded');
  }

  @Mutation(() => Service)
  async updateService(
    @Args({ name: 'serviceId', type: () => Int }) serviceId: number,
    @Args('data') newServiceData: UpdateServiceInput
  ) {
    return this.prisma.service.update({
      data: newServiceData,
      where: {
        id: serviceId,
      },
    });
  }

  @Mutation(() => Service)
  async deleteService(
    @Args({ name: 'serviceId', type: () => Int }) serviceId: number
  ) {
    return this.prisma.service.delete({
      where: {
        id: serviceId,
      },
    });
  }

  @Query(() => [Service])
  async allServices() {
    return await this.prisma.service.findMany();
  }

  @Query(() => [Service])
  async getSurgeryList() {
    const notList = [3, 37, 38];
    return await this.prisma.service.findMany({
      where: {
        NOT: notList.map((i) => ({ typeId: i })),
      },
    });
  }

  @ResolveField('type', () => ServiceType)
  async type(@Parent() service: Service) {
    return this.prisma.serviceType.findUnique({
      where: { id: service.typeId },
    });
  }
}
