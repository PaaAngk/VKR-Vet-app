import { Module } from '@nestjs/common';
import { ServiceListResolver } from './service-list.resolver';
import { ServiceResolver } from './services.resolver';

@Module({
  imports: [],
  providers: [ServiceResolver, ServiceListResolver],
})
export class ServiceModule {}
