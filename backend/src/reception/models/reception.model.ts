import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Employee } from 'src/common/models';
import { GoodsList } from 'src/goods/models/goods-list.model';
import { Pet } from 'src/pets/models/pet.model';
import { ServiceList } from 'src/services/models/service-list.model';
import { ReceptionPurpose } from './reception-purpose.model';

@ObjectType()
export class Reception {
  @Field(() => String)
  id: string;

  @Field(() => Pet, { nullable: true })
  pet?: Pet;

  @Field(() => Employee)
  employee?: Employee;

  @Field(() => ReceptionPurpose)
  purpose?: ReceptionPurpose;

  @Field(() => String)
  petId?: string;

  @Field(() => Int)
  employeeId?: number;

  @Field(() => Int)
  purposeId?: number;

  @Field(() => [GoodsList], { nullable: 'itemsAndList' })
  goods?: GoodsList[];

  @Field(() => [ServiceList], { nullable: 'itemsAndList' })
  services?: ServiceList[];

  @Field(() => String, { nullable: true, description: 'Клинические признаки' })
  clinicalSigns?: string;

  @Field(() => String, { nullable: true, description: 'Анамнез' })
  anamnesis?: string;

  @Field(() => String, { nullable: true, description: 'Диагноз' })
  diagnosis?: string;

  @Field(() => String, { nullable: true, description: 'Лист назначения' })
  assignment?: string;

  @Field(() => Float, {
    nullable: true,
    description: 'Посчитанная стоимость приема по усулгам и товарам',
  })
  cost?: number;

  @Field(() => Int, { nullable: true, description: 'Скидка на прием' })
  @Min(0)
  @Max(100)
  discount?: number;

  @Field({
    description: 'Identifies the date and time when the object was created.',
    nullable: true,
  })
  createdAt?: Date;
}
