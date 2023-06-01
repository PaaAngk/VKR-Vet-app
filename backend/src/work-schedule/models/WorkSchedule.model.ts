import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/common/models';

@ObjectType()
export class WorkSchedule {
  @Field(() => Int)
  id: number;

  @Field(() => Employee)
  employee?: Employee;

  @Field(() => Int, { nullable: true })
  employeeId?: number;

  @Field(() => Date, {
    nullable: false,
    description: 'Дата рабочего дня',
  })
  date: Date;
}
