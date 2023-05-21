import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  skip?: number;

  @Field(() => String, { nullable: true })
  after?: string;

  before?: string;

  first?: number;

  last?: number;
}
