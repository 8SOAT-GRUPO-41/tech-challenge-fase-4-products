import { NotFoundError } from '@/domain/errors'
import type { IUpdateProduct } from '@/application/usecases/product/update-product'
import type { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'
import { productMock } from '@/tests/domain/mocks'

type Input = {
  productId: string
} & Partial<{
  name: string
  category: ProductCategory
  price: number
  description: string
}>

export class UpdateProductSpy implements IUpdateProduct {
  callsCount = 0
  lastInput?: Input
  shouldThrowNotFound = false
  result = productMock

  async execute(input: Input): Promise<Product> {
    this.callsCount++
    this.lastInput = input

    if (this.shouldThrowNotFound) {
      throw new NotFoundError('Product not found')
    }

    return this.result
  }
}
