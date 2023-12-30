import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Client } from 'src/clients/models/client.model';
import { Employee } from 'src/common/models';
import { ReceptionPurpose } from 'src/reception/models/reception-purpose.model';
import { Department } from 'src/common/models/department.model';

@ObjectType()
export class ReceptionRecord {
  @Field(() => Int)
  id: number;

  @Field(() => Client, { nullable: true })
  client?: Client;

  @Field(() => Employee, { nullable: true })
  employee?: Employee;

  @Field(() => ReceptionPurpose, { nullable: true })
  purpose?: ReceptionPurpose;

  @Field(() => String, { nullable: true })
  clientId?: string;

  @Field(() => Int, { nullable: true })
  employeeId?: number;

  @Field(() => Int, { nullable: true })
  receptionPurposeId?: number;

  @Field(() => Date, {
    nullable: false,
    description: 'Дата и время начала записи',
  })
  dateTimeStart: Date;

  @Field(() => Date, {
    nullable: false,
    description: 'Дата и время конца записи',
  })
  dateTimeEnd: Date;

  @Field(() => String, { nullable: true, description: 'Вид животного' })
  kindOfAnimal?: string;

  // @Field(() => Department, { nullable: true })
  // department?: Department;
}
