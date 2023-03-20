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
import { ServiceList } from 'src/services/models/service-list.model';
import { GoodsList } from 'src/goods/models/goods-list.model';
import { Employee } from 'src/common/models';
import { UpdateReceptionInput } from './dto/UpdateReceptionInput.input';
import { Pet } from 'src/pets/models/pet.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Reception)
export class ReceptionResolver {
  constructor(private prisma: PrismaService) {}

  /**
   * Adding new reception with list of goods and services.
   * Adding new reception id into goods and services array with they input class.
   * @param data
   * @returns new reception
   */
  @Mutation(() => Reception)
  async createReception(@Args('data') data: CreateReceptionInput) {
    const newReception = await this.prisma.reception.create({
      data: {
        petId: data.petId,
        employeeId: data.employeeId,
        purposeId: data.purposeId,
        clinicalSigns: data.clinicalSigns?.trim() || null,
        anamnesis: data.anamnesis?.trim() || null,
        diagnosis: data.diagnosis?.trim() || null,
        assignment: data.assignment?.trim() || null,
        discount: data.discount,
        cost: data.cost,
      },
    });

    if (data.goodsListReceptionInput.length > 0) {
      const addInGoodsListInput = data.goodsListReceptionInput.map((goods) => ({
        ...goods,
        receptionId: newReception.id,
      }));

      await this.prisma.goodsList.createMany({
        data: addInGoodsListInput,
      });
    }

    if (data.serviceListReceptionInput.length > 0) {
      const addInServiceListInput = data.serviceListReceptionInput.map(
        (service) => ({
          ...service,
          receptionId: newReception.id,
        })
      );

      await this.prisma.serviceList.createMany({
        data: addInServiceListInput,
      });
    }
    return newReception;
  }

  /**
   * update reception with list of goods and services.
   * update reception id into goods and services array with they input class.
   * @param newReceptionData
   * @param receptionId
   * @returns new reception
   */
  @Mutation(() => Reception)
  async updateReception(
    @Args({ name: 'receptionId', type: () => String }) receptionId: string,
    @Args('data') newReceptionData: UpdateReceptionInput
  ) {
    const newReception = await this.prisma.reception.update({
      data: {
        employeeId: newReceptionData.employeeId,
        purposeId: newReceptionData.purposeId,
        clinicalSigns: newReceptionData.clinicalSigns?.trim() || null,
        anamnesis: newReceptionData.anamnesis?.trim() || null,
        diagnosis: newReceptionData.diagnosis?.trim() || null,
        assignment: newReceptionData.assignment?.trim() || null,
        cost: newReceptionData.cost,
        discount: newReceptionData.discount,
      },
      where: {
        id: receptionId,
      },
    });

    if (newReceptionData.goodsListReceptionInput.length > 0) {
      await this.prisma.goodsList.deleteMany({
        where: { receptionId: receptionId },
      });

      const addInGoodsListInput = newReceptionData.goodsListReceptionInput.map(
        (goods) => ({
          ...goods,
          receptionId: newReception.id,
        })
      );

      await this.prisma.goodsList.createMany({
        data: addInGoodsListInput,
      });
    }

    if (newReceptionData.serviceListReceptionInput.length > 0) {
      await this.prisma.serviceList.deleteMany({
        where: { receptionId: receptionId },
      });

      const addInServiceListInput =
        newReceptionData.serviceListReceptionInput.map((service) => ({
          ...service,
          receptionId: newReception.id,
        }));

      await this.prisma.serviceList.createMany({
        data: addInServiceListInput,
      });
    }
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

  @ResolveField('employee', () => Employee)
  async employee(@Parent() reception: Reception) {
    return this.prisma.employee.findUnique({
      where: { id: reception.employeeId },
    });
  }

  @ResolveField('services', () => [ServiceList])
  async services(@Parent() reception: Reception) {
    return this.prisma.serviceList.findMany({
      where: { receptionId: reception.id },
    });
  }

  @ResolveField('goods', () => [GoodsList])
  async goods(@Parent() reception: Reception) {
    return this.prisma.goodsList.findMany({
      where: { receptionId: reception.id },
    });
  }

  @ResolveField('pet', () => Pet)
  async pet(@Parent() reception: Reception) {
    return this.prisma.pet.findUnique({
      where: { id: reception.petId },
    });
  }
}
