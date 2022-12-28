import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnalyzesResearchInput {
  @Field()
  @IsNotEmpty()
  typeId?: number;

  @Field()
  @IsNotEmpty()
  petId?: string;

  @Field()
  data?: string;
}
