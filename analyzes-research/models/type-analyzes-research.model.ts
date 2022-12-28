import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnalyzesResearch } from './analyzes-research.model';

@ObjectType()
export class TypeAnalyzesResearch {
  @Field(() => Int)
  id: number;

  @Field(() => [AnalyzesResearch])
  AnalyzesResearch?: AnalyzesResearch[] | null;

  @Field(() => String, { nullable: true })
  typeName?: string;
}
