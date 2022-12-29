import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Service } from './service.model';

@ObjectType()
export class ServiceType {
  @Field(() => Int)
  id?: number;

  @Field(() => [Service])
  service?: Service[];

  @Field(() => String)
  typeName?: string;
}
