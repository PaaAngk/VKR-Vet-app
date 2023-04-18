import {
  Body,
  Controller,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FormDataRequest } from 'nestjs-form-data';
import { FormDataDto } from 'src/printed/dto/formDataDto';
import { AnalyzesResearchService } from './analyzes-research.service';

@Controller('analyzes')
export class AnalyzesResearchController {
  constructor(
    private prisma: PrismaService,
    private analyzesService: AnalyzesResearchService
  ) {}

  /**
   * d
   * @param file
   * @param res
   */
  @Post('upload-file')
  @FormDataRequest()
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  async convertDocxToPdf1(
    // @UploadedFile() files: Express.Multer.File,
    @Body() files: any,
    @Res({ passthrough: true }) res
  ) {
    // console.log(files);
    if (files) {
      this.analyzesService.saveFiles(files as FormDataDto[], files.analyzeData);
      // res.set({
      //   'Content-Type': 'application/pdf',
      //   'Content-Disposition': `attachment; filename=${fileName}.pdf`,
      //   'Content-Length': pdfBuf.length,
      // });
      // res.end(pdfBuf);
    } else {
      throw new HttpException('don`t has file', HttpStatus.NOT_FOUND);
    }
  }
}
