import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Mutation,
  Int,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Employee } from 'src/common/models';
import { WorkSchedule } from './models/WorkSchedule.model';
import { CreateWorkScheduleInput } from './dto/CreateWorkScheduleInput.input';
import { BetweenDateInput } from 'src/receptionRecord/dto/BetweenDateInput.input';
import { WorkScheduleIdArgs } from './args/workSchedule-id.args';
import { UpdateWorkScheduleInput } from './dto/UpdateWorkScheduleInput.input';
import { WorkScheduleCreateArgs } from './args/workScheduleCreate.args';

@ObjectType()
class CountOutput {
  @Field()
  count: number;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => WorkSchedule)
export class WorkScheduleResolver {
  constructor(private prisma: PrismaService) {}

  /**
   * Adding new schedule. Delete previos.
   * @param data
   * @returns new schedule data
   */
  @Mutation(() => [WorkSchedule])
  async createWorkSchedule(@Args('data') data: CreateWorkScheduleInput) {
    const dataForCreate: WorkScheduleCreateArgs[] = [];
    const endDate = new Date(
      new Date(data.dateWorkStart).setDate(
        data.dateWorkStart.getDate() + data.workDays
      )
    );
    // Add row each 0-2 days, pass 3-5 days
    let daysCounter = 0;
    for (
      let dt: Date = new Date(data.dateWorkStart);
      dt <= endDate;
      dt.setDate(dt.getDate() + 1)
    ) {
      if (daysCounter <= 2) {
        dataForCreate.push({
          employeeId: data.employeeId,
          date: new Date(dt),
        });
      }
      daysCounter += 1;
      if (daysCounter == 6) {
        daysCounter = 0;
      }
    }
    try {
      await this.prisma.schedule.deleteMany({
        where: {
          employeeId: data.employeeId,
        },
      });
    } catch {
      throw new NotFoundException(`Can not delete`);
    }
    try {
      await this.prisma.schedule.createMany({
        data: dataForCreate,
      });
    } catch {
      throw new NotFoundException(`Can not add`);
    }
    const newWorkSchedule = await this.prisma.schedule.findMany({
      where: {
        date: { lte: endDate, gte: data.dateWorkStart },
      },
    });
    return newWorkSchedule;
  }

  /**
   * Update schedule with data
   * @param workScheduleId
   * @param newData
   * @returns
   */
  @Mutation(() => WorkSchedule)
  async updateWorkSchedule(
    @Args({ name: 'workScheduleId', type: () => Int })
    workScheduleId: number,
    @Args('data') newData: UpdateWorkScheduleInput
  ) {
    return await this.prisma.schedule.update({
      data: {
        employeeId: newData.employeeId,
        date: newData.date,
      },
      where: {
        id: workScheduleId,
      },
    });
  }

  @Query(() => WorkSchedule)
  async getWorkScheduleById(@Args() { workScheduleId }: WorkScheduleIdArgs) {
    return await this.prisma.schedule.findUnique({
      where: {
        id: workScheduleId,
      },
    });
  }

  @Mutation(() => WorkSchedule)
  async deleteWorkScheduleById(@Args() { workScheduleId }: WorkScheduleIdArgs) {
    return await this.prisma.schedule.delete({
      where: {
        id: workScheduleId,
      },
    });
  }

  @Mutation(() => CountOutput)
  async deleteWorkScheduleAllEmployeeById(
    @Args({ name: 'employeeId', type: () => Int })
    employeeId: number
  ) {
    return await this.prisma.schedule.deleteMany({
      where: {
        employeeId: employeeId,
      },
    });
  }

  /**
   * Get schedule between dates
   * @param data
   * @returns
   */
  @Query(() => [WorkSchedule])
  async getWorkSchedulesBetweenDate(@Args('data') data: BetweenDateInput) {
    return await this.prisma.schedule.findMany({
      where: {
        date: { lte: data.dateEnd, gte: data.dateStart },
      },
    });
  }

  @ResolveField('employee', () => Employee)
  async employee(@Parent() workScheduleId: WorkSchedule) {
    return this.prisma.schedule
      .findUnique({ where: { id: workScheduleId.id } })
      .Employee();
  }
}
