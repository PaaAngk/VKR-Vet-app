import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Header = createParamDecorator(
  (name: string, ctx: ExecutionContext) => {
    const gqlExecutionContext = GqlExecutionContext.create(ctx);
    const request = gqlExecutionContext.getContext().req;
    const { headers } = request;
    return headers[name] || undefined;
  }
);
