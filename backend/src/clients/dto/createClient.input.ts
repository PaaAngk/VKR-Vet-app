import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClientInput {
  @Field()
  @IsNotEmpty()
  fullName: string;

  @Field()
  @IsNotEmpty()
  telephoneNumber: string;

  @Field(() => String, { nullable: true })
  address?: string | null;
}
