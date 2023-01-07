import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';

@Module({
  imports: [],
  providers: [EmployeeResolver],
})
export class EmployeeModule {}
