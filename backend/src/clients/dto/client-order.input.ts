import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum ClientOrderField {
  id = 'id',
  createdAt = 'createdAt',
  fullName = 'fullName',
  telephoneNumber = 'telephoneNumber',
  address = 'address',
}

registerEnumType(ClientOrderField, {
  name: 'ClientOrderField',
  description: 'Properties by which client connections can be ordered.',
});

@InputType()
export class ClientOrder extends Order {
  field: ClientOrderField;
}
