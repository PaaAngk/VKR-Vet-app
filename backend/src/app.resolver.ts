import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';

@Resolver()
export class AppResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  async helloWorld(): Promise<string> {
    const login = 'ivan.ivanovich';
    const users = await this.prisma.user.findUnique({ where: { login } });
    return `Hello World! ${users.fullName}`;
  }

  @Query(() => String)
  hello(@Args('name') name: string): string {
    return `Hello ${name}!`;
  }
}
