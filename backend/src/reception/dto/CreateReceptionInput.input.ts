import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReceptionInput {
  @Field()
  @IsNotEmpty()
  petId: string;

  @Field()
  @IsNotEmpty()
  employeeId: number;

  @Field()
  @IsNotEmpty()
  purposeId: number;

  @Field()
  clinicalSigns?: string;

  @Field()
  anamnesis?: string;

  @Field()
  diagnosis?: string;

  @Field()
  assignment?: string;

  @Field()
  cost?: number;
}
