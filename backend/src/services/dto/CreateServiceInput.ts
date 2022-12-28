import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  @IsNotEmpty()
  typeId?: number;

  @Field()
  @IsNotEmpty()
  name?: string;

  @Field()
  @IsNotEmpty()
  price?: number;
}
