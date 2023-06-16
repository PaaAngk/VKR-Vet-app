import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { firstValueFrom, Subject } from 'rxjs';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';
import { AnalyzesResearch } from './models/analyzes-research.model';

@Injectable()
export class AnalyzesResearchService {
  constructor(private prisma: PrismaService) {}
  buf: Subject<Buffer> = new Subject();

  /**
   * Save upload files on server and add path to this data in db
   * @param files array of files
   * @param data pet and nalyze data
   */
  async saveAnalyze(files: MemoryStoredFile[], data: any) {
    const analyzeData = JSON.parse(data);
    const dirPath = `Researchs/${analyzeData.petId}`;
    await mkdir(dirPath, { recursive: true });
    // console.log(analyzeData);
    const savedFiles = await this.saveFales(files, analyzeData.typeId, dirPath);
    return await this.prisma.analyzesResearch.create({
      data: {
        petId: analyzeData.petId,
        typeId: analyzeData.typeId,
        data: JSON.stringify(savedFiles),
      },
    });
  }

  async updateAnalyze(files: MemoryStoredFile[], data: any) {
    const analyzeData = JSON.parse(data);
    const savedFiles = JSON.parse(analyzeData.data);
    const dirPath = `Researchs/${analyzeData.pet}`;
    for (const file of savedFiles) {
      try {
        const promise = unlink(file.path);
        await promise;
      } catch (err) {
        console.error(err);
        throw new Error('Can not delete!');
      }
    }
    const saveFiles = await this.saveFales(files, analyzeData.id, dirPath);
    // console.log(saveFiles);
    return await this.prisma.analyzesResearch.update({
      data: {
        data: JSON.stringify(saveFiles),
      },
      where: { id: analyzeData.id },
    });
  }

  async saveFales(
    files: MemoryStoredFile[],
    analyzeId: number,
    dirPath: string
  ) {
    const savedFiles = [];
    for (const [, file] of Object.entries(files)) {
      const fileName = file.originalName.split('.');
      // eslint-disable-next-line prettier/prettier
      const filePath = `${dirPath}/${fileName[0]}__${analyzeId}.${fileName.pop()}`;
      try {
        const promise = writeFile(filePath, file.buffer);
        await promise;
      } catch (err) {
        console.error(err);
        throw new Error('Can not add!');
      }
      savedFiles.push({
        path: filePath,
        name: file.originalName,
        size: file.size,
        mimetype: file.mimetype,
      });
    }
    return savedFiles;
  }

  async deleteFales(analyzesResearch: AnalyzesResearch) {
    const savedFiles = JSON.parse(analyzesResearch.data);
    for (const file of savedFiles) {
      try {
        const promise = unlink(file.path);
        await promise;
      } catch (err) {
        console.error(err);
        throw new Error('Can not delete!');
      }
    }
  }
}
