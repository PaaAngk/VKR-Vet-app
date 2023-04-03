import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PrintController } from './print.controller';
import { PrintService } from './print.service';

@Module({
  imports: [NestjsFormDataModule],
  controllers: [PrintController],
  providers: [PrintService],
})
export class PrintModule {}
