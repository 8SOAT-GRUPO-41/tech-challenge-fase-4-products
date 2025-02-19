import { makeProductRepository } from '@/infrastructure/factories/repositories'
import { FindProduct } from '@/application/usecases/product'

export const makeFindProduct = (): FindProduct => {
  return new FindProduct(makeProductRepository())
}
