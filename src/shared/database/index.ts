import { Db, MongoClient } from 'mongodb';

class Database {
  private client: MongoClient | null = null;
  db: Db | undefined;

  constructor() {
    this.db = this.client?.db();
  }

  async connect(): Promise<MongoClient> {
    if (!this.client) {
      const url =
        process.env.NODE_ENV === 'test'
          ? process.env.DATABASE_URL_TEST || ''
          : process.env.DATABASE_URL || '';
      console.log(url);
      this.client = new MongoClient(url);
      await this.client.connect();
    }
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
    }
  }
}

export default new Database();
