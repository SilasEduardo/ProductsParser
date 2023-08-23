import * as fs from 'fs';
import * as zlib from 'zlib';
import { AxiosResponse } from 'axios';

export async function downloadFile(
  fileStream: fs.WriteStream,
  response: AxiosResponse<any>
) {
  response.data.pipe(fileStream);

  await new Promise<void>((resolve, reject) => {
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('download completed');
      resolve();
      return true;
    });

    fileStream.on('error', (err) => {
      console.error('Error downloading file:', err);
      reject(err);
      return err;
    });
  });
}

export async function extractFile(
  readStream: fs.ReadStream,
  writeStream: fs.WriteStream
) {
  const unzip = zlib.createGunzip();
  readStream.pipe(unzip).pipe(writeStream);

  await new Promise<void>((resolve, reject) => {
    writeStream.on('finish', () => {
      writeStream.close();
      console.log('Completed extraction');
      resolve();
      return true;
    });

    writeStream.on('error', (err) => {
      console.error('Error extracting file:', err);
      reject(err);
      return err;
    });
  });
}

export function status(name: string) {
  const status = {
    enum: ['draft', 'trash', 'published'],
    default: name,
    function() {
      if (!this.enum.some((v) => v === this.default))
        return console.log(' e esperado draft, trash, published');
    },
  };

  status.function();

  return status;
}
