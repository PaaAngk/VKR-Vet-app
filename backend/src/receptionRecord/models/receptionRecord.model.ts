import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Client } from 'src/clients/models/client.model';
import { Employee } from 'src/common/models';
import { ReceptionPurpose } from 'src/reception/models/reception-purpose.model';

@ObjectType()
export class ReceptionRecord {
  @Field(() => Int)
  id: number;

  @Field(() => Client, { nullable: true })
  client?: Client;

  @Field(() => Employee)
  employee?: Employee;

  @Field(() => ReceptionPurpose)
  purpose?: ReceptionPurpose;

  @Field(() => String)
  clientId?: string;

  @Field(() => Int)
  employeeId?: number;

  @Field(() => Int)
  receptionPurposeId?: number;

  @Field(() => Date, { nullable: false, description: 'Дата начала записи' })
  dateTimeStart: Date;

  @Field(() => Date, { nullable: false, description: 'Дата конца записи' })
  dateTimeEnd: Date;

  @Field(() => String, { nullable: true, description: 'Вид животного' })
  kindOfAnimal?: string;
}
