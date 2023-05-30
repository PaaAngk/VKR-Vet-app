import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePetInput {
  @Field()
  @IsNotEmpty()
  alias: string;

  @Field()
  @IsNotEmpty()
  kind?: string;

  @Field(() => Boolean, { nullable: true })
  gender?: boolean | null;

  @Field(() => String, { nullable: true })
  breed?: string;

  @Field(() => Date, { nullable: true })
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

  @Field(() => Int)
  clientId?: number;
}
