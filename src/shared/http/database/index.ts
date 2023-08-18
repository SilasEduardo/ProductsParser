import { MongoClient } from 'mongodb';

async function connectToDatabase(): Promise<MongoClient> {
  const client = new MongoClient(
    `mongodb+srv://silas:${process.env.DATABASE_PASS}@cluster0.5yguqpd.mongodb.net/`
  );

  await client.connect();
  return client;
}

export { connectToDatabase };
