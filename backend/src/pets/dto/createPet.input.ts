import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';
import { Client } from '@prisma/client';

@InputType()
export class CreatePetInput {
  @Field()
  @IsNotEmpty()
  clientId: string;

  @Field()
  @IsNotEmpty()
  alias: string;

  @Field()
  kind?: string;

  @Field()
  gender?: boolean | null;

  @Field()
  breed?: string;

  @Field()
  DOB?: Date;

  @Field()
  nutrition?: string;

  @Field()
  color?: string;

  @Field()
  castration?: boolean | null;

  @Field()
  notes?: string;

  @Field()
  diagnosis?: string;

  @Field(() => Float)
  weight?: number;
}
