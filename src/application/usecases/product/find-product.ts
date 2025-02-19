import type { ProductRepository } from '@/application/ports'
import type { Product } from '@/domain/entities'
import { NotFoundError } from '@/domain/errors'

type Input = {
  productId: string
}

export class FindProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Product> {
    const product = await this.productRepository.findById(input.productId)
    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }
}
