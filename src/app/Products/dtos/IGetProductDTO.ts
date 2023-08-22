export interface IGetProductDTO {
  lastCronTime: any;
  runtime: string;
  memoryInUse: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
    arrayBuffers: string;
  };
}
