import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class PetIdArgs {
  @IsNotEmpty()
  petId: number;
}
