import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Reception } from 'src/reception/models/reception.model';

@ObjectType()
export class Employee {
  @Field(() => Int)
  id?: number;

  @Field(() => [Reception])
  receptions?: Reception[] | null;

  @Field(() => String)
  fullName: string;

  @Field(() => Role)
  role?: Role;
}
