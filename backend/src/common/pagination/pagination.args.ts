import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  skip?: number;

  @Field(() => Int, { nullable: true })
  after?: number | null;

  before?: number;

  first?: number;

  last?: number;
}
