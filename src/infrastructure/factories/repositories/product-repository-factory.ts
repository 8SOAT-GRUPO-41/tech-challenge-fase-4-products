import { ProductRepositoryDatabase } from '@/infrastructure/repository'
import type { ProductRepository } from '@/application/ports'
import { MongoDBConnection } from '@/infrastructure/database/mongo-connection'

export const makeProductRepository = (): ProductRepository => {
  return new ProductRepositoryDatabase(MongoDBConnection.getInstance())
}
