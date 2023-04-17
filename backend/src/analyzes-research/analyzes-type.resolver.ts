import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { TypeAnalyzesResearch } from './models/type-analyzes-research.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => TypeAnalyzesResearch)
export class TypeAnalyzesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [TypeAnalyzesResearch])
  async allTypeAnalyzesResearch() {
    return this.prisma.typeAnalyzesResearch.findMany();
  }
}
