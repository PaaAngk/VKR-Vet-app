import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { writeFile, mkdir } from 'fs/promises';
import { firstValueFrom, Subject } from 'rxjs';
import { PrismaService } from 'nestjs-prisma/dist/prisma.service';

@Injectable()
export class AnalyzesResearchService {
  constructor(private prisma: PrismaService) {}
  buf: Subject<Buffer> = new Subject();

  /**
   * Save upload files on server and add path to this data in db
   * @param files array of files
   * @param data pet and nalyze data
   */
  async saveFiles(files: MemoryStoredFile[], data: any) {
    const analyzeData = JSON.parse(data);
    const savedFiles = [];
    for (const [, file] of Object.entries(files)) {
      const fileName = file.originalName.split('.');
      const dirPath = `Researchs/${analyzeData.petId}`;
      // eslint-disable-next-line prettier/prettier
      const filePath = `${dirPath}/${fileName[0]}_${analyzeData.id}.${fileName.pop()}`;
      await mkdir(dirPath, { recursive: true });
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
    return await this.prisma.analyzesResearch.create({
      data: {
        petId: analyzeData.petId,
        typeId: analyzeData.typeId,
        data: JSON.stringify(savedFiles),
      },
    });
  }
}
