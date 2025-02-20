import type { ProductRepository } from '@/application/ports'
import { NotFoundError } from '@/domain/errors'

export interface IDeleteProduct {
  execute: (id: string) => Promise<void>
}

export class DeleteProduct implements IDeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id)
    if (!product) throw new NotFoundError('Product not found')
    await this.productRepository.delete(id)
  }
}
