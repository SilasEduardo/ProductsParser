interface ICronProductRepository {
  downloadFileFromURL(filename: string): Promise<boolean | undefined>;
  extractGzipFile(
    inputFilename: string,
    outputFilename: string
  ): Promise<boolean | undefined>;
  insertToDB(name: string): Promise<void>;
  updateDB(): Promise<boolean | undefined>;
  deleteFile(nameJson: string): Promise<boolean>;
  nameFileExists(nameFile: string): Promise<boolean>;
}

export { ICronProductRepository };
