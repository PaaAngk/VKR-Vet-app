import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ServiceList } from './service-list.model';
import { ServiceType } from './service-type.model';

@ObjectType()
export class Service {
  @Field(() => Int)
  id?: number;

  @Field(() => ServiceType, { nullable: true })
  type?: ServiceType;

  @Field(() => [ServiceList])
  ServiceList?: ServiceList[];

  @Field(() => Int)
  typeId?: number;

  @Field(() => String)
  name?: string;

  @Field(() => Float)
  price?: number;
}
