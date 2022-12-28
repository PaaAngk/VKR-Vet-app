import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Reception } from 'src/reception/models/reception.model';

@ObjectType()
export class ReceptionPurpose {
  @Field(() => Int)
  id?: number;

  @Field(() => [Reception])
  receptions?: Reception[] | null;

  @Field(() => String)
  purposeName: string;
}
