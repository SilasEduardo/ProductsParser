interface ICronRepository {
  downloadFileFromURL(filename: string): Promise<void>;
  extractGzipFile(inputFilename: string, outputFilename: string): Promise<void>;
  insertToDB(name: string): Promise<void>;
  updateDB(): Promise<void>;
  deleteFile(nameJson: string): Promise<void>;
}

export { ICronRepository };