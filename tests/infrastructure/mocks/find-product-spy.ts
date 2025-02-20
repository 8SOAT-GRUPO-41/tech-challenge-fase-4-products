import type { IFindProduct } from '@/application/usecases/product'
import type { Product } from '@/domain/entities'
import { productMock } from '@/tests/domain/mocks'

export class FindProductSpy implements IFindProduct {
  executeParams?: { productId: string }

  execute(input: { productId: string }): Promise<Product> {
    this.executeParams = input

    return Promise.resolve(productMock)
  }
}
