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
import { AnalyzesResearch } from './models/analyzes-research.model';
import { CreateAnalyzesResearchInput } from './dto/CreateAnalyzesResearchInput.input';
import { AnalyzesResearchIdArgs } from './args/analyzes-research-id.args';
import { TypeAnalyzesResearch } from './models/type-analyzes-research.model';
import { Pet } from 'src/pets/models/pet.model';
import { UpdateAnalyzesResearchInput } from './dto/UpdateAnalyzesResearchInput.input copy';

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
        data: data.data,
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

  @Mutation(() => AnalyzesResearch)
  async deleteResearch(@Args() { analyzesResearchId }: AnalyzesResearchIdArgs) {
    return await this.prisma.analyzesResearch.delete({
      where: {
        id: analyzesResearchId,
      },
    });
  }

  @Mutation(() => AnalyzesResearch)
  async updateAnalyzesResearch(
    @Args({ name: 'analyzesResearchId', type: () => String })
    analyzesResearchId: string,
    @Args('data') newAnalyzesData: UpdateAnalyzesResearchInput
  ) {
    return await this.prisma.analyzesResearch.update({
      data: {
        data: newAnalyzesData.data || null,
      },
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

  @ResolveField('pet', () => Pet)
  async pet(@Parent() typeAnalyzesResearch: AnalyzesResearch) {
    return this.prisma.pet.findUnique({
      where: { id: typeAnalyzesResearch.petId },
    });
  }
}
