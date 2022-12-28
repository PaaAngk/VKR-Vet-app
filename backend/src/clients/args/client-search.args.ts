import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ClientSearchArgs {
  search: string;
}
