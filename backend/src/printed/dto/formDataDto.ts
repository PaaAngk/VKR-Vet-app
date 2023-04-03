import { InputType } from '@nestjs/graphql';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

@InputType()
export class FormDataDto {
  @IsFile()
  file: MemoryStoredFile;
}
