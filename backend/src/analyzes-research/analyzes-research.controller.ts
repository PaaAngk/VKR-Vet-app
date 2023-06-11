import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { AnalyzesResearchService } from './analyzes-research.service';
import { readFile } from 'fs/promises';

interface FileData {
  path: string;
  name: string;
  size: number;
  mimetype: string;
}

@Controller('analyzes')
export class AnalyzesResearchController {
  constructor(private analyzesService: AnalyzesResearchService) {}

  /**
   * Save upload files on server and add path to this data in db
   * @param file
   * @param res
   */
  @Post('upload-analyzes-file')
  @FormDataRequest()
  async uploadAnalyzesFile(@Body() files: any) {
    if (files) {
      const analyzeData = files.analyzeData;
      delete files.analyzeData;
      try {
        return await this.analyzesService.saveAnalyze(
          files as MemoryStoredFile[],
          analyzeData
        );
      } catch (err) {
        console.error(err);
        throw new HttpException(
          'Can not save files',
          HttpStatus.NOT_ACCEPTABLE
        );
      }
    } else {
      throw new HttpException('don`t has files', HttpStatus.NOT_FOUND);
    }
  }

  @Post('update-analyzes-file')
  @FormDataRequest()
  async updateAnalyzesFile(@Body() files: any) {
    if (files) {
      const analyzeData = files.analyzeData;
      delete files.analyzeData;

      try {
        return await this.analyzesService.updateAnalyze(
          files as MemoryStoredFile[],
          analyzeData
        );
      } catch (err) {
        console.error(err);
        throw new HttpException(
          'Can not update files',
          HttpStatus.NOT_ACCEPTABLE
        );
      }
    } else {
      throw new HttpException('don`t has files', HttpStatus.NOT_FOUND);
    }
  }

  @Post('download-analyzes-file')
  async downloadAnalyzesFile(
    @Body() file: FileData,
    @Res({ passthrough: true }) res
  ) {
    if (file) {
      try {
        const readedFile = await readFile(file.path);
        res.set({
          'Content-Type': file.mimetype,
          'Content-Disposition': `attachment; filename=${file.name}`,
        });
        res.json(readedFile);
      } catch (err) {
        console.error(err);
        throw new HttpException('Can`t download', HttpStatus.NOT_ACCEPTABLE);
      }
    } else {
      throw new HttpException('don`t has path', HttpStatus.NOT_FOUND);
    }
  }
}
