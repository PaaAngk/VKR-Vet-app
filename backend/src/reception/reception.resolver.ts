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
import { ReceptionIdArgs } from './args/reception-id.args';
import { Reception } from './models/reception.model';
import { CreateReceptionInput } from './dto/CreateReceptionInput.input';
import { ReceptionPurpose } from './models/reception-purpose.model';
import { Service } from 'src/services/models/service.model';
import { ServiceList } from 'src/services/models/service-list.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Reception)
export class ReceptionResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Reception)
  async createReception(@Args('data') data: CreateReceptionInput) {
    const newReception = this.prisma.reception.create({
      data: {
        petId: data.petId,
        employeeId: data.employeeId,
        purposeId: data.purposeId,
        clinicalSigns: data.clinicalSigns?.trim() || null,
        anamnesis: data.anamnesis?.trim() || null,
        diagnosis: data.diagnosis?.trim() || null,
        assignment: data.assignment?.trim() || null,
        cost: data.cost,
      },
    });
    return newReception;
  }

  @Query(() => Reception)
  async reception(@Args() { receptionId }: ReceptionIdArgs) {
    return await this.prisma.reception.findUnique({
      where: {
        id: receptionId,
      },
    });
  }

  @ResolveField('purpose', () => ReceptionPurpose)
  async purpose(@Parent() reception: Reception) {
    return this.prisma.receptionPurpose.findUnique({
      where: { id: reception.purposeId },
    });
  }

  @ResolveField('serviceList', () => [ServiceList])
  async serviceList(@Parent() reception: Reception) {
    return this.prisma.serviceList.findMany({
      where: { receptionId: reception.id },
    });
  }
}
