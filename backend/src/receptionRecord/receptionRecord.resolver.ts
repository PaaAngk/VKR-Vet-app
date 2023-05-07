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
import { ReceptionRecordBetweenDateArgs } from './args/receptionRecordDate.args';

@UseGuards(GqlAuthGuard)
@Resolver(() => ReceptionRecord)
export class ReceptionRecordResolver {
  constructor(private prisma: PrismaService) {}

  /**
   * Adding new reception record.
   * @param data
   * @returns new reception record
   */
  @Mutation(() => ReceptionRecord)
  async createReceptionRecord(@Args('data') data: CreateReceptionRecordInput) {
    const newReceptionRecord = await this.prisma.receptionRecord.create({
      data: {
        clientId: data.clientId,
        employeeId: data.employeeId,
        receptionPurposeId: data.receptionPurposeId,
        dateTimeStart: data.dateTimeStart,
        dateTimeEnd: data.dateTimeEnd,
        kindOfAnimal: data.kindOfAnimal,
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
        clientId: newnewReceptionRecordIdDataData.clientId,
        employeeId: newnewReceptionRecordIdDataData.employeeId,
        receptionPurposeId: newnewReceptionRecordIdDataData.receptionPurposeId,
        dateTimeStart: newnewReceptionRecordIdDataData.dateTimeStart,
        dateTimeEnd: newnewReceptionRecordIdDataData.dateTimeEnd,
        kindOfAnimal: newnewReceptionRecordIdDataData.kindOfAnimal,
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

  @Query(() => ReceptionRecord)
  async receptionRecordBetweenDate(
    @Args() { dateStart, dateEnd }: ReceptionRecordBetweenDateArgs
  ) {
    return await this.prisma.receptionRecord.findMany({
      where: {
        dateTimeStart: dateStart,
        dateTimeEnd: dateEnd,
      },
    });
  }

  @ResolveField('employee', () => Employee)
  async employee(@Parent() receptionRecord: ReceptionRecord) {
    return this.prisma.employee.findUnique({
      where: { id: receptionRecord.employeeId },
    });
  }

  @ResolveField('client', () => Client)
  async client(@Parent() receptionRecord: ReceptionRecord) {
    return this.prisma.pet.findUnique({
      where: { id: receptionRecord.clientId },
    });
  }
}
