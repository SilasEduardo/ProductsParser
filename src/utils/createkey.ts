import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export function createKey() {
  if (!process.env.RANDOM_NUMBER) {
    fs.writeFileSync('.env', `RANDOM_NUMBER=${uuidv4()}\n`, { flag: 'a' });
  }
}
