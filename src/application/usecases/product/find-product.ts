import type { ProductRepository } from '@/application/ports'
import type { Product } from '@/domain/entities'
import { NotFoundError } from '@/domain/errors'

type Input = {
  productId: string
}

export interface IFindProduct {
  execute: (input: Input) => Promise<Product>
}

export class FindProduct implements IFindProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Product> {
    const product = await this.productRepository.findById(input.productId)
    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }
}
