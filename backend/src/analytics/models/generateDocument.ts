export enum FileFormat {
  'docx',
  'pdf',
}

export interface GenerateDocument {
  docName: string;
  data: any;
  extension: FileFormat;
}
