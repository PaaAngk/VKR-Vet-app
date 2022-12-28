import { Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';

@Module({
  imports: [],
  providers: [PetsResolver],
})
export class PetsModule {}
