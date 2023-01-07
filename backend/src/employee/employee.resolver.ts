import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Employee } from './models/employee.model';

@Resolver(() => Employee)
@UseGuards(GqlAuthGuard)
export class EmployeeResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Employee])
  async allEmployees() {
    return await this.prisma.employee.findMany();
  }
}
