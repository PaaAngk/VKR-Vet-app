import { InputType, registerEnumType } from '@nestjs/graphql';

export enum Department {
  Angarsk = 'Ангарск',
  Usolye = 'Усолье-Сибирское',
}

registerEnumType(Department, {
  name: 'Department',
  description:
    'Properties by which select need department for write warehouse and registry data.',
});

@InputType()
export class DepartmentState {
  depart: Department;
}
