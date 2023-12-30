import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';

@Resolver()
export class AppResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  async helloWorld(): Promise<string> {
    return `Hello World!`;
  }

  @Query(() => String)
  hello(@Args('name') name: string): string {
    return `Hello ${name}!`;
  }

  @Query(() => String)
  resetIndexes(): string {
    // DO $$
    // DECLARE temprow RECORD;
    // BEGIN FOR temprow IN
    //     SELECT 'SELECT SETVAL(' ||
    //   quote_literal(quote_ident(PGT.schemaname) || '.' || quote_ident(S.relname)) ||
    //   ', COALESCE(MAX(' ||quote_ident(C.attname)|| '), 1) ) FROM ' ||
    //   quote_ident(PGT.schemaname)|| '.'||quote_ident(T.relname)|| ';' as instr
    //   FROM pg_class AS S,
    //   pg_depend AS D,
    //   pg_class AS T,
    //   pg_attribute AS C,
    //   pg_tables AS PGT
    //   WHERE S.relkind = 'S'
    //   AND S.oid = D.objid
    //   AND D.refobjid = T.oid
    //   AND D.refobjid = C.attrelid
    //   AND D.refobjsubid = C.attnum
    //   AND T.relname = PGT.tablename
    //   ORDER BY S.relname
    //   LOOP
    //   EXECUTE temprow.instr;
    //   END LOOP;
    // END; $$
    return `Hello !`;
  }
}
