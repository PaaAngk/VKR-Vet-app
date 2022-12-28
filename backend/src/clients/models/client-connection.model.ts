import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Client } from './client.model';

@ObjectType()
export class ClientConnection extends PaginatedResponse(Client) {}
