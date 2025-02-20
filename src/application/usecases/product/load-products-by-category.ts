import type { ProductRepository } from '@/application/ports'
import type { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'

export interface ILoadProductsByCategory {
  execute: (category: ProductCategory) => Promise<Product[]>
}

export class LoadProductsByCategory implements ILoadProductsByCategory {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(category: ProductCategory): Promise<Product[]> {
    return this.productRepository.findByCategory(category)
  }
}
