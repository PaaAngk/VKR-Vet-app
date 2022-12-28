import { Module } from '@nestjs/common';
import { ReceptionResolver } from './reception.resolver';

@Module({
  imports: [],
  providers: [ReceptionResolver],
})
export class ReceptionModule {}
