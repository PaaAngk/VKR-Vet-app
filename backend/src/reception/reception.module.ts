import { Module } from '@nestjs/common';
import { ReceptionPurposeResolver } from './reception-purpose.resolver';
import { ReceptionResolver } from './reception.resolver';

@Module({
  imports: [],
  providers: [ReceptionResolver, ReceptionPurposeResolver],
})
export class ReceptionModule {}
