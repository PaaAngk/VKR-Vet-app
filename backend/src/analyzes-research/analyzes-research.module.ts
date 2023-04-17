import { Module } from '@nestjs/common';
import { AnalyzesResearchResolver } from './analyzes-research.resolver';
import { TypeAnalyzesResolver } from './analyzes-type.resolver';

@Module({
  imports: [],
  providers: [AnalyzesResearchResolver, TypeAnalyzesResolver],
})
export class AnalyzesResearchModule {}
