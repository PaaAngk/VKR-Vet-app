import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { AnalyzesResearch } from 'src/analyzes-research/models/analyzes-research.model';
import { Client } from 'src/clients/models/client.model';
import { Reception } from 'src/reception/models/reception.model';

@ObjectType()
export class Pet {
  @Field(() => Int)
  id: number;

  @Field(() => Client)
  client?: Client;

  @Field(() => [Reception])
  receptions?: Reception[];

  @Field(() => [AnalyzesResearch])
  analyzesResearchs?: AnalyzesResearch[];

  @Field(() => String)
  alias: string;

  @Field(() => Int)
  clientId?: number;

  @Field(() => String, { nullable: true })
  kind?: string;

  @Field(() => Boolean, { nullable: true })
  gender?: boolean | null;

  @Field(() => String, { nullable: true })
  breed?: string;

  @Field(() => String, { nullable: true })
  DOB?: Date;

  @Field(() => String, { nullable: true })
  nutrition?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => Boolean, { nullable: true })
  castration?: boolean | null;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => String, { nullable: true })
  diagnosis?: string;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field({
    description: 'Identifies the date and time when the object was created.',
    nullable: true,
  })
  createdAt?: Date;
}
