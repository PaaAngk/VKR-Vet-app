import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { writeFile, readFile } from 'fs/promises';
import { firstValueFrom, Subject } from 'rxjs';
// import carbone from 'carbone';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const carbone = require('carbone');

@Injectable()
export class PrintService {
  buf: Subject<Buffer> = new Subject();

  data = {
    firstname: 'John',
    lastname: 'Doe',
  };

  async renderDocxToPdf(template: string, data: any) {
    const returnBuffer: Subject<Buffer> = new Subject();

    carbone.render(
      template,
      data,
      { convertTo: 'pdf' },
      async function (err, result) {
        if (err) {
          throw new HttpException('don`t has file', HttpStatus.NOT_FOUND);
        }
        returnBuffer.next(result);
      }
    );
    return await firstValueFrom(returnBuffer);
  }

  async convertDocxToPdf(file: Buffer): Promise<Buffer> {
    const returnBuffer: Subject<Buffer> = new Subject();

    carbone.convert(
      file,
      { convertTo: 'pdf', extension: 'doc' },
      (err, result) => {
        if (err) {
          throw new HttpException('Error in convert', HttpStatus.NOT_FOUND);
        }
        returnBuffer.next(result);
      }
    );
    return await firstValueFrom(returnBuffer);
  }
}
