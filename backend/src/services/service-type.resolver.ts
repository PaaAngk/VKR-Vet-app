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
import { ServiceType } from './models/service-type.model';
import { CreateServiceTypeInput } from './dto/CreateServiceTypeInput';

@UseGuards(GqlAuthGuard)
@Resolver(() => ServiceType)
export class ServiceTypeResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => ServiceType)
  async addInServiceList(@Args('data') data: CreateServiceTypeInput) {
    return this.prisma.serviceType.create({
      data: {
        typeName: data.typeName,
      },
    });
  }

  @Query(() => [ServiceType])
  async allServiceType() {
    return await this.prisma.serviceType.findMany();
  }

  @ResolveField('service', () => [Service])
  async service(@Parent() serviceType: ServiceType) {
    return this.prisma.service.findMany({
      where: { typeId: serviceType.id },
    });
  }
}
