import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ServiceListReceptionInput {
  @Field()
  @IsNotEmpty()
  serviceId: number;

  @Field()
  @IsNotEmpty()
  quantity: number;
}
