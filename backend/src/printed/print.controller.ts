import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrintService } from './print.service';
import { FormDataRequest } from 'nestjs-form-data';
import { FormDataDto } from './dto/formDataDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom, Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const libre = require('libreoffice-convert');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const carbone = require('carbone');

@Controller('print')
export class PrintController {
  constructor(
    private readonly printService: PrintService,
    private prisma: PrismaService
  ) {}

  /**
   * Convert docx document to pdf extension
   */
  @Post('convert-docx-to-pdf')
  @FormDataRequest()
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  @Header('Content-Type', 'application/pdf')
  async convertDocxToPdf(
    @Body() file: FormDataDto,
    @Res({ passthrough: true }) res
  ) {
    if (file) {
      //Getting file name for set as new pdf file name
      const fileName = file.file.originalName.split('.')[0];

      //Send document to converting
      const buf = await this.printService.convertDocxToPdf(file.file.buffer);

      console.log(buf);
      // Waiting promice with generated document
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${fileName}.pdf`,
        'Content-Length': buf.length,
      });
      res.json(buf);
    } else {
      throw new HttpException('don`t has file', HttpStatus.LENGTH_REQUIRED);
    }
  }

  @Post('checkPdfGenerate')
  async generateCheck(@Body() data: any, @Res({ passthrough: true }) res) {
    let buf;
    if (data.t.length > 11) {
      buf = await this.printService.renderDocxToPdf(
        './src/printed/files/check.docx',
        data
      );
    } else {
      buf = await this.printService.renderDocxToPdf(
        './src/printed/files/twoCheckOneList.docx',
        data
      );
    }
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=check.pdf`,
      'Content-Length': buf.length,
    });
    res.json(buf);
  }

  /**
   * convert by row libre ofice
   * @param file
   * @param res
   */
  @Post('convert-docx-to-pdf-libre')
  @UseInterceptors(FileInterceptor('file'))
  @Header('Content-Type', 'application/pdf')
  async convertDocxToPdf1(
    @UploadedFile() file,
    @Res({ passthrough: true }) res
  ) {
    console.log(file);
    if (file) {
      const fileName = file.originalname.split('.')[0];
      const buf: Subject<Buffer> = new Subject();

      await libre.convert(file.buffer, '.pdf', undefined, (err, result) => {
        if (err)
          throw new HttpException('Can `t convert', HttpStatus.NOT_FOUND);
        buf.next(result);
      });
      const pdfBuf = await firstValueFrom(buf);
      console.log(pdfBuf);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${fileName}.pdf`,
        'Content-Length': pdfBuf.length,
      });
      res.end(pdfBuf);
    } else {
      throw new HttpException('don`t has file', HttpStatus.NOT_FOUND);
    }
  }
}
