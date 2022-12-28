import { Module } from '@nestjs/common';
import { AnalyzesResearchResolver } from './analyzes-research.resolver';

@Module({
  imports: [],
  providers: [AnalyzesResearchResolver],
})
export class AnalyzesResearchModule {}
