import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data/dist/nestjs-form-data.module';
import { AnalyzesResearchController } from './analyzes-research.controller';
import { AnalyzesResearchResolver } from './analyzes-research.resolver';
import { AnalyzesResearchService } from './analyzes-research.service';
import { TypeAnalyzesResolver } from './analyzes-type.resolver';

@Module({
  imports: [NestjsFormDataModule],
  providers: [
    AnalyzesResearchResolver,
    TypeAnalyzesResolver,
    AnalyzesResearchService,
  ],
  controllers: [AnalyzesResearchController],
})
export class AnalyzesResearchModule {}
