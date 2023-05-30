import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pet } from 'src/pets/models/pet.model';

@ObjectType()
export class Client {
  @Field(() => Int)
  id: number;

  @Field(() => String, {
    description: 'Client full name.',
  })
  fullName: string;

  @Field(() => String)
  telephoneNumber: string;

  @Field(() => String, { nullable: true })
  address?: string | null;

  @Field(() => [Pet], { nullable: true })
  pets?: Pet[] | null;
}
