import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
// import { writeFile, readFile } from 'fs/promises';
import { firstValueFrom, Subject } from 'rxjs';
import { FormDataDto } from 'src/printed/dto/formDataDto';
// import carbone from 'carbone';

@Injectable()
export class AnalyzesResearchService {
  buf: Subject<Buffer> = new Subject();

  async saveFiles(files: FormDataDto[], data: any) {
    const returnBuffer: Subject<Buffer> = new Subject();
    const analyzeData = JSON.parse(data);
    console.log(files);
    console.log(analyzeData);

    for (const file of files) {
      console.log(file.file.originalName);
    }

    return await firstValueFrom(returnBuffer);
  }
}
