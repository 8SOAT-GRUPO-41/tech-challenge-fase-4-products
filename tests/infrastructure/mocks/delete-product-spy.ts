import { NotFoundError } from '@/domain/errors'
import type { IDeleteProduct } from '@/application/usecases/product/delete-product'

export class DeleteProductSpy implements IDeleteProduct {
  callsCount = 0
  lastId?: string
  shouldThrowNotFound = false

  async execute(id: string): Promise<void> {
    this.callsCount++
    this.lastId = id

    if (this.shouldThrowNotFound) {
      throw new NotFoundError('Product not found')
    }
  }
}
