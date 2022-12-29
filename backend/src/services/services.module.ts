import { Module } from '@nestjs/common';
import { ServiceListResolver } from './service-list.resolver';
import { ServiceTypeResolver } from './service-type.resolver';
import { ServiceResolver } from './services.resolver';

@Module({
  imports: [],
  providers: [ServiceResolver, ServiceListResolver, ServiceTypeResolver],
})
export class ServiceModule {}
