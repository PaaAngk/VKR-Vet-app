import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  @IsNotEmpty()
  typeId?: number;

  @Field()
  @IsNotEmpty()
  name?: string;

  @Field(() => Float)
  @IsNotEmpty()
  price?: number;
}
