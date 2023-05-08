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
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { ReceptionRecordIdArgs } from './args/reception-id.args';
import { ReceptionRecord } from './models/receptionRecord.model';
import { CreateReceptionRecordInput } from './dto/CreateReceptionRecordInput.input';
import { Employee } from 'src/common/models';
import { UpdateReceptionRecordInput } from './dto/UpdateReceptionRecordInput.input';
import { Client } from 'src/clients/models/client.model';
import { ReceptionRecordBetweenDateInput } from './dto/ReceptionRecordBetweenDateInput.input';
import { ReceptionPurpose } from 'src/reception/models/reception-purpose.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => ReceptionRecord)
export class ReceptionRecordResolver {
  constructor(private prisma: PrismaService) {}

  /**
   * Adding new reception record
   * @param data
   * @returns new reception record
   */
  @Mutation(() => ReceptionRecord)
  async createReceptionRecord(@Args('data') data: CreateReceptionRecordInput) {
    const newReceptionRecord = await this.prisma.receptionRecord.create({
      data: {
        clientId: data.clientId || null,
        employeeId: data.employeeId || null,
        receptionPurposeId: data.receptionPurposeId || null,
        dateTimeStart: data.dateTimeStart,
        dateTimeEnd: data.dateTimeEnd,
        kindOfAnimal: data.kindOfAnimal || null,
      },
    });
    return newReceptionRecord;
  }

  /**
   * @param newReceptionData
   * @param receptionRecordId
   * @returns new reception
   */
  @Mutation(() => ReceptionRecord)
  async updateReceptionRecord(
    @Args({ name: 'receptionRecordId', type: () => Int })
    receptionRecordId: number,
    @Args('data') newnewReceptionRecordIdDataData: UpdateReceptionRecordInput
  ) {
    const newReceptionRecord = await this.prisma.receptionRecord.update({
      data: {
        clientId: newnewReceptionRecordIdDataData.clientId || null,
        employeeId: newnewReceptionRecordIdDataData.employeeId || null,
        receptionPurposeId:
          newnewReceptionRecordIdDataData.receptionPurposeId || null,
        dateTimeStart: newnewReceptionRecordIdDataData.dateTimeStart,
        dateTimeEnd: newnewReceptionRecordIdDataData.dateTimeEnd,
        kindOfAnimal: newnewReceptionRecordIdDataData.kindOfAnimal || null,
      },
      where: {
        id: receptionRecordId,
      },
    });
    return newReceptionRecord;
  }

  @Query(() => ReceptionRecord)
  async receptionRecord(@Args() { receptionRecordId }: ReceptionRecordIdArgs) {
    return await this.prisma.receptionRecord.findUnique({
      where: {
        id: receptionRecordId,
      },
    });
  }

  @Query(() => [ReceptionRecord])
  async receptionRecordBetweenDate(
    @Args('data') data: ReceptionRecordBetweenDateInput
  ) {
    console.log(data.dateStart);
    console.log(data.dateEnd);
    return await this.prisma.receptionRecord.findMany({
      where: {
        OR: [
          {
            dateTimeStart: { lte: data.dateEnd },
            dateTimeEnd: { gte: data.dateStart },
          },
          {
            dateTimeStart: { gte: data.dateStart },
            dateTimeEnd: { lte: data.dateEnd },
          },
        ],
      },
    });
  }

  @ResolveField('employee', () => Employee)
  async employee(@Parent() receptionRecord: ReceptionRecord) {
    // return this.prisma.employee.findUnique({
    //   where: { id: receptionRecord.employeeId },
    // });
    return this.prisma.receptionRecord
      .findUnique({ where: { id: receptionRecord.id } })
      .Employee();
  }

  @ResolveField('client', () => Client)
  async client(@Parent() receptionRecord: ReceptionRecord) {
    // const { clientId } = receptionRecord;
    // return this.prisma.client.findUnique({
    //   where: { id: clientId },
    // });
    return this.prisma.receptionRecord
      .findUnique({ where: { id: receptionRecord.id } })
      .Client();
  }

  @ResolveField('purpose', () => ReceptionPurpose)
  async purpose(@Parent() receptionRecord: ReceptionRecord) {
    // return this.prisma.receptionPurpose.findUnique({
    //   where: { id: receptionRecord.receptionPurposeId },
    // });
    return this.prisma.receptionRecord
      .findUnique({ where: { id: receptionRecord.id } })
      .ReceptionPurpose();
  }
}
