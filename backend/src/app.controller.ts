import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AppService } from './app.service';
import libre from 'libreoffice-convert';
import fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name);
  }

  @Get('servicesByType')
  async getServicesByType() {
    return await this.prisma.service.findMany();
  }

  @Post('file')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  @Header('Content-Type', '*/*')
  @UseInterceptors(FileInterceptor('file'))
  async uploadedFile(@UploadedFile() file) {
    console.log(file);
    const res = await this.appService.convertDocxToPdf();
    console.log(res);

    const response = {
      originalname: file.originalname,
      filename: file.fieldname,
      file: res,
    };
    return response;
  }

  @Post('convert-docx-to-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async convertDocxToPdf(@UploadedFile() file) {
    console.log(file);
    if (file) {
      // const fileRead = fs.createReadStream(file.buffer);
      const outputFilePath = 'output.pdf';

      await libre.convert(file.buffer, '.pdf', undefined, (err, done) => {
        if (err) {
          fs.unlinkSync(file.path);
          fs.unlinkSync(outputFilePath);

          throw new HttpException(
            'some error taken place in conversion process',
            HttpStatus.NOT_FOUND
          );
        }

        console.log(done);

        return {
          done,
          file: file?.buffer.toString(),
        };
      });
    } else {
      throw new HttpException('don`t has file', HttpStatus.NOT_FOUND);
    }
  }
}

// fs.writeFileSync(outputFilePath, done);
// res.download(outputFilePath,(err) => {
//   if(err){
//     fs.unlinkSync(req.file.path)
//     fs.unlinkSync(outputFilePath);
//     res.send('some error taken place in downloading the file');
//   }
//   fs.unlinkSync(req.file.path);
//   fs.unlinkSync(outputFilePath);
// });
