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
import { AnalyzesResearchIdArgs } from './args/analyzes-research-id.args';
import { CreateAnalyzesResearchInput } from './dto/CreateAnalyzesResearchInput.input';
import { AnalyzesResearch } from './models/analyzes-research.model';
import { TypeAnalyzesResearch } from './models/type-analyzes-research.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => AnalyzesResearch)
export class AnalyzesResearchResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => AnalyzesResearch)
  async createAnalyzesResearch(
    @Args('data') data: CreateAnalyzesResearchInput
  ) {
    const newAnalyzesResearch = this.prisma.analyzesResearch.create({
      data: {
        petId: data.petId,
        typeId: data.typeId,
        data: data.data || null,
      },
    });
    return newAnalyzesResearch;
  }

  @Query(() => AnalyzesResearch)
  async analyzesResearch(
    @Args() { analyzesResearchId }: AnalyzesResearchIdArgs
  ) {
    return await this.prisma.analyzesResearch.findUnique({
      where: {
        id: analyzesResearchId,
      },
    });
  }

  @ResolveField('type', () => TypeAnalyzesResearch)
  async type(@Parent() analyzesResearch: AnalyzesResearch) {
    return this.prisma.typeAnalyzesResearch.findUnique({
      where: { id: analyzesResearch.typeId },
    });
  }
}
