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
import { Pet } from './models/pet.model';
import { CreatePetInput } from './dto/createPet.input';
import { PetIdArgs } from './args/reception-id.args';
import { Client } from 'src/clients/models/client.model';
import { Reception } from 'src/reception/models/reception.model';
import { AnalyzesResearch } from 'src/analyzes-research/models/analyzes-research.model';

@UseGuards(GqlAuthGuard)
@Resolver(() => Pet)
export class PetsResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Pet)
  async createPet(@Args('data') data: CreatePetInput) {
    const newPet = this.prisma.pet.create({
      data: {
        clientId: data.clientId,
        alias: data.alias.trim(),
        kind: data.kind?.trim() || null,
        gender: data.gender || null,
        breed: data.breed?.trim() || null,
        DOB: data.DOB || null,
        nutrition: data.nutrition?.trim() || null,
        color: data.color?.trim() || null,
        castration: data.castration || null,
        notes: data.notes?.trim() || null,
        diagnosis: data.diagnosis?.trim() || null,
        weight: data.weight,
      },
    });
    return newPet;
  }

  @Query(() => Pet)
  async pet(@Args() { petId }: PetIdArgs) {
    return await this.prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });
  }

  @ResolveField('client', () => Client)
  async client(@Parent() pet: Pet) {
    return this.prisma.pet.findUnique({ where: { id: pet.id } }).client();
  }

  @ResolveField('receptions', () => [Reception])
  async receptions(@Parent() pet: Pet) {
    const { id } = pet;
    return this.prisma.reception.findMany({ where: { petId: id } });
  }

  @ResolveField('analyzesResearchs', () => [AnalyzesResearch])
  async analyzesResearchs(@Parent() pet: Pet) {
    const { id } = pet;
    return this.prisma.analyzesResearch.findMany({ where: { petId: id } });
  }
}
