import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
  Int,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Client } from './models/client.model';
import { ClientConnection } from './models/client-connection.model';
import { ClientOrder } from './dto/client-order.input';
import { CreateClientInput } from './dto/createClient.input';
import { ClientSearchArgs } from './args/client-search.args';
import { ClientIdArgs } from './args/client-id.args';
import { Pet } from 'src/pets/models/pet.model';
import { UpdateClientInput } from './dto/UpdateClientInput';

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

  @Mutation(() => Client)
  async updateClient(
    @Args({ name: 'clientId', type: () => Int }) clientId: number,
    @Args('data') newClientData: UpdateClientInput
  ) {
    return this.prisma.client.update({
      data: newClientData,
      where: {
        id: clientId,
      },
    });
  }

  @Mutation(() => Client)
  async deleteClient(
    @Args({ name: 'clientId', type: () => Int }) clientId: number
  ) {
    return this.prisma.client.delete({
      where: {
        id: clientId,
      },
    });
  }

  @Query(() => ClientConnection)
  async searchClients(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args() { search }: ClientSearchArgs,
    @Args({
      name: 'orderBy',
      type: () => ClientOrder,
      nullable: true,
    })
    orderBy: ClientOrder
  ) {
    const result = await findManyCursorConnection(
      (args) =>
        this.prisma.client.findMany({
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
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.client.count({
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
        }),
      { first, last, before, after }
    );
    return result;
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
