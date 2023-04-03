import { Injectable } from '@nestjs/common';
// import { writeFile, readFile } from 'fs/promises';
import { firstValueFrom, Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const carbone = require('carbone');

@Injectable()
export class AppService {
  buf: Subject<Buffer> = new Subject();

  data = {
    firstname: 'John',
    lastname: 'Doe',
  };

  getHello(): string {
    return 'Hello World!';
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }

  // async renderDocxToPdf(template: string, filename: string) {
  //   let result: any;
  //   carbone.render(
  //     template,
  //     this.data,
  //     { convertTo: 'pdf' },
  //     async function (err, result) {
  //       if (err) {
  //         throw new HttpException('don`t has file', HttpStatus.NOT_FOUND);
  //       }
  //       await writeFile(filename, result);
  //       return result;
  //     }
  //   );
  //   return result;
  // }

  // async getPdf(template: Buffer, filename: string): Promise<Buffer> {
  //   try {
  //     // await this.convertDocxToPdf(template, filename);
  //     const pdf = await readFile(filename);
  //     return pdf;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  getPdfConvert(): Promise<Buffer> {
    return firstValueFrom(this.buf);
  }

  // getConvertDocx(template: Buffer, filename: string): Observable<Buffer> {
  //   // let buffer = null;
  //   this.convertDocxToPdf(template, filename);
  //   // this.buf.subscribe((data: Buffer) => {
  //   //   console.log('data');
  //   //   console.log(data);
  //   //   buffer = data;
  //   // });
  //   return this.buf.asObservable();

  //   // while (true) {
  //   //   if (buffer) {
  //   //     return buffer;
  //   //   }
  //   // }
  //   // return buffer;
  //   // try {
  //   //   const result = await this.convertDocxToPdf(template, filename);
  //   //   const pdf = readFile(filename);
  //   //   console.log('!!!!!!!!!');
  //   //   console.log(result);
  //   //   return pdf;
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   throw new HttpException('don`t has file', HttpStatus.NOT_FOUND);
  //   // }
  // }

  // setConvertDocxToPdf(template: Buffer): Promise<Buffer> {
  //   try {
  //     return carbone.convert(
  //       template,
  //       { convertTo: 'pdf', extension: 'docx' },
  //       (err, result) => {
  //         if (err) {
  //           throw new HttpException('Error in convert', HttpStatus.NOT_FOUND);
  //         }
  //         this.buf.next(result);
  //         return result;
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
