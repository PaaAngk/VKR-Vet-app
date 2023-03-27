import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const carbone = require('carbone');

@Injectable()
export class AppService {
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

  async convertDocxToPdf() {
    let result: any;
    carbone.render(
      './src/doc.docx',
      this.data,
      // { convertTo: 'pdf' },
      function (err, result) {
        if (err) {
          return console.log(err);
        }
        console.log(result);
        // writeFile('./src/result.docx', result);
        this.res = result;
        return result;
      }
    );
    console.log();
    // promise.then(function(data) {
    return result;
  }
}
