import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { ReceptionPurpose } from './models/reception-purpose.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => ReceptionPurpose)
export class ReceptionPurposeResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ReceptionPurpose])
  async allReceptionPurpose() {
    return this.prisma.receptionPurpose.findMany();
  }
}
