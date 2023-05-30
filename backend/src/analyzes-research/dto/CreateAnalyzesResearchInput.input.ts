import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnalyzesResearchInput {
  @Field()
  @IsNotEmpty()
  petId: number;

  @Field()
  @IsNotEmpty()
  typeId: number;

  @Field()
  @IsNotEmpty()
  data?: string;
}
