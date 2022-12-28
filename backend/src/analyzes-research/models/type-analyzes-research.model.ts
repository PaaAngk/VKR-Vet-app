import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnalyzesResearch } from './analyzes-research.model';

@ObjectType()
export class TypeAnalyzesResearch {
  @Field(() => Int)
  id?: number;

  @Field(() => [AnalyzesResearch])
  analyzesResearch?: AnalyzesResearch[] | null;

  @Field(() => String)
  typeName?: string;
}
