import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class ServiceListReceptionInput {
  @Field()
  @IsNotEmpty()
  serviceId: number;

  @Field(() => Float)
  @IsNotEmpty()
  quantity: number;
}
