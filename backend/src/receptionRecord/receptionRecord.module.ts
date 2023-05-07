import { Module } from '@nestjs/common';
import { ReceptionRecordResolver } from './receptionRecord.resolver';

@Module({
  imports: [],
  providers: [ReceptionRecordResolver],
})
export class ReceptionRecordModule {}
