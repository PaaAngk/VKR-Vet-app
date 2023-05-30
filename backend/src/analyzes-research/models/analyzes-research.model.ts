import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pet } from 'src/pets/models/pet.model';
import { TypeAnalyzesResearch } from './type-analyzes-research.model';

@ObjectType()
export class AnalyzesResearch {
  @Field(() => Number)
  id: number;

  @Field(() => TypeAnalyzesResearch, { nullable: true })
  type?: TypeAnalyzesResearch;

  @Field(() => Pet)
  pet?: Pet;

  @Field(() => Int)
  typeId?: number;

  @Field(() => Int)
  petId?: number;

  @Field(() => String)
  data?: string;

  @Field({
    description: 'Identifies the date and time when the object was created.',
    nullable: true,
  })
  createdAt?: Date;
}
