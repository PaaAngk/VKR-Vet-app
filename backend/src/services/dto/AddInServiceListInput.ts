import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddInServiceListInput {
  @Field()
  @IsNotEmpty()
  receptionId?: number;

  @Field()
  @IsNotEmpty()
  serviceId?: number;

  @Field()
  @IsNotEmpty()
  quantity?: number;
}
