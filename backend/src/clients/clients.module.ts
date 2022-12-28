import { Module } from '@nestjs/common';
import { ClientsResolver } from './clients.resolver';

@Module({
  imports: [],
  providers: [ClientsResolver],
})
export class ClientModule {}
