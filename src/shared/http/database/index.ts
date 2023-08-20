import { Db, MongoClient } from 'mongodb';

class Database {
  private client: MongoClient | null = null;
  db: Db | undefined;

  constructor() {
    this.db = this.client?.db();
  }

  async connect(): Promise<MongoClient> {
    if (!this.client) {
      const uri = `mongodb+srv://silas:${process.env.DATABASE_PASSWORD}@cluster0.5yguqpd.mongodb.net/`;
      this.client = new MongoClient(uri);
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
