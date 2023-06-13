import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Mutation,
  Int,
} from '@nestjs/graphql';
import {
  ConflictException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
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
    let newReception;
    // Check of available goods quantity in warehouse and write current quant for reduse in db
    const currentQuantArr: number[] = [];
    console.log(data.goodsListReceptionInput);
    for (const goods of data.goodsListReceptionInput) {
      const currentQuant = await this.prisma.goods.findUnique({
        where: { id: goods.goodsId },
      });
      currentQuantArr.push(currentQuant.quantity);
      console.log(currentQuantArr);
      if (currentQuant.quantity - goods.quantity < 0) {
        throw new ForbiddenException('Недостаточно товара для списания.');
      }
    }
    try {
      newReception = await this.prisma.reception.create({
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
    } catch {
      throw new ConflictException('Ошибка добавления приема');
    }

    if (data.goodsListReceptionInput.length > 0) {
      const addInGoodsListInput = data.goodsListReceptionInput.map((goods) => ({
        ...goods,
        receptionId: newReception.id,
      }));

      // reduse quatnity in warehouse
      try {
        data.goodsListReceptionInput.forEach(async (goods, i) => {
          await this.prisma.goods.update({
            where: { id: goods.goodsId },
            data: {
              quantity: currentQuantArr[i] - goods.quantity,
            },
          });
        });
      } catch {
        throw new ForbiddenException('Ошибка в обновлении остатка товара');
      }

      try {
        await this.prisma.goodsList.createMany({
          data: addInGoodsListInput,
        });
      } catch {
        throw new ConflictException('Ошибка добавления списка товаров');
      }
    }

    if (data.serviceListReceptionInput.length > 0) {
      const addInServiceListInput = data.serviceListReceptionInput.map(
        (service) => ({
          ...service,
          receptionId: newReception.id,
        })
      );

      try {
        await this.prisma.serviceList.createMany({
          data: addInServiceListInput,
        });
      } catch {
        throw new ConflictException('Ошибка добавления списка услуг');
      }
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
    @Args({ name: 'receptionId', type: () => Int }) receptionId: number,
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

    await this.prisma.goodsList.deleteMany({
      where: { receptionId: receptionId },
    });
    if (newReceptionData.goodsListReceptionInput.length > 0) {
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

    await this.prisma.serviceList.deleteMany({
      where: { receptionId: receptionId },
    });
    if (newReceptionData.serviceListReceptionInput.length > 0) {
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
