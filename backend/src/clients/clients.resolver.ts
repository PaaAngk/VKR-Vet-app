import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Client } from './models/client.model';
import { ClientConnection } from './models/client-connection.model';
import { ClientOrder } from './dto/client-order.input';
import { CreateClientInput } from './dto/createClient.input';
import { ClientSearchArgs } from './args/client-search.args';
import { ClientIdArgs } from './args/client-id.args';
import { Pet } from 'src/pets/models/pet.model';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(() => Client)
export class ClientsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Client)
  clientCreated() {
    return pubSub.asyncIterator('clientCreated');
  }

  @Mutation(() => Client)
  async createClient(@Args('data') data: CreateClientInput) {
    const newClient = this.prisma.client.create({
      data: {
        fullName: data.fullName.trim(),
        telephoneNumber: data.telephoneNumber.trim(),
        address: data.address?.trim() || null,
      },
    });
    pubSub.publish('clientCreated', { clientCreated: newClient });
    return newClient;
  }

  @Query(() => ClientConnection)
  async publishedClients(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'name', type: () => String, nullable: true })
    name: string,
    @Args({ name: 'telephone', type: () => String, nullable: true })
    telephone: string,
    @Args({
      name: 'orderBy',
      type: () => ClientOrder,
      nullable: true,
    })
    orderBy: ClientOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.client.findMany({
          where: {
            fullName: { contains: name || '' },
            telephoneNumber: { contains: telephone || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.client.count({
          where: {
            fullName: { contains: name || '' },
            telephoneNumber: { contains: telephone || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  /**
   * get all clients and get clients by search query on full name and number
   * @param search search query (optional)
   * @returns array of clients
   */
  @Query(() => [Client])
  async clientsWithSearch(@Args() { search }: ClientSearchArgs) {
    return await this.prisma.client.findMany({
      where: {
        OR: [
          {
            fullName: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
          {
            telephoneNumber: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  /**
   * Getting clients data with its pet by id
   * @param clientId id client
   * @returns clinet with pets
   */
  @Query(() => Client)
  async clientDetail(@Args() { clientId }: ClientIdArgs) {
    return await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
  }

  @ResolveField()
  async pets(@Parent() pet: Pet) {
    const { id } = pet;
    return this.prisma.pet.findMany({ where: { clientId: id } });
  }

  // @ResolveField('author', () => Client)
  // async author(@Parent() post: Post) {
  //   return this.prisma.post.findUnique({ where: { id: post.id } }).author();
  // }
}