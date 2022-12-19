import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
  Int,
} from '@nestjs/graphql';
// import { IsEmail } from 'class-validator';
// import { Post } from 'src/posts/models/post.model';

// import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});
//extends BaseModel
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  login: string;

  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => Role)
  role: Role;

  @HideField()
  password: string;
}
// @Field(() => [Post], { nullable: true })
// posts?: [Post] | null;
