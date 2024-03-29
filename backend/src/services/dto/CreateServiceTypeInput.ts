import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceTypeInput {
  @Field()
  @IsNotEmpty()
  typeName?: string;
}
