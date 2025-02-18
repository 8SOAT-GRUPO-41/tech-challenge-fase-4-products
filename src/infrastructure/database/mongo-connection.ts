import { type Document, MongoClient, type Collection } from 'mongodb'

export class MongoDBConnection {
  private client!: MongoClient
  private static instance: MongoDBConnection

  static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection()
    }
    return MongoDBConnection.instance
  }

  async open(): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL as string)
  }

  async close(): Promise<void> {
    await this.client.close()
  }

  getCollection<T extends Document>(name: string): Collection<T> {
    return this.client.db('products').collection<T>(name)
  }

  map(data: any): any {
    const { _id, ...dataWithoutId } = data
    return { id: _id, ...dataWithoutId }
  }

  mapCollection(data: any[]): any[] {
    return data.map((item) => this.map(item))
  }
}
