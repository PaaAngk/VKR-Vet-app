import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pet } from 'src/pets/models/pet.model';
import { TypeAnalyzesResearch } from './type-analyzes-research.model';

@ObjectType()
export class AnalyzesResearch {
  @Field(() => String)
  id: string;

  @Field(() => TypeAnalyzesResearch)
  TypeAnalyzesResearch?: TypeAnalyzesResearch;

  @Field(() => Pet)
  Pet?: Pet;

  @Field(() => Int)
  typeId?: number;

  @Field(() => String)
  petId?: string;

  @Field(() => String)
  data?: string;

  @Field({
    description: 'Identifies the date and time when the object was created.',
    nullable: true,
  })
  createdAt?: Date;
}
