import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ClientSearchArgs {
  @Field(() => String, { nullable: true })
  search: string;
}
