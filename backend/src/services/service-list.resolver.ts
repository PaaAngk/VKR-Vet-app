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
import { Service } from './models/service.model';
import { AddInServiceListInput } from './dto/AddInServiceListInput';
import { ServiceList } from './models/service-list.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => ServiceList)
export class ServiceListResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => ServiceList)
  async addInServiceList(@Args('data') data: AddInServiceListInput) {
    return this.prisma.serviceList.create({
      data: {
        receptionId: data.receptionId,
        serviceId: data.serviceId,
        quantity: data.quantity,
      },
    });
  }

  @Query(() => [ServiceList])
  async allServiceLists() {
    return await this.prisma.serviceList.findMany();
  }

  @ResolveField('service', () => Service)
  async service(@Parent() serviceList: ServiceList) {
    return this.prisma.service.findUnique({
      where: { id: serviceList.serviceId },
    });
  }
}
