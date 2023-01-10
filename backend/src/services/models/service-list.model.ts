import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Reception } from 'src/reception/models/reception.model';
import { Service } from './service.model';

@ObjectType()
export class ServiceList {
  @Field(() => Reception)
  Reception?: Reception;

  @Field(() => Service)
  Service?: Service;

  @Field(() => String)
  receptionId?: string;

  @Field(() => Int)
  serviceId?: number;

  @Field(() => Int)
  quantity?: number;
}
