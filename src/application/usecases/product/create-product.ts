import type { ProductRepository } from '@/application/ports'
import { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'

type Input = {
  name: string
  category: ProductCategory
  price: number
  description: string
}

export interface ICreateProduct {
  execute: (params: Input) => Promise<Product>
}

export class CreateProduct implements ICreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(params: Input): Promise<Product> {
    const { name, category, price, description } = params
    const product = Product.create(name, category, price, description)
    await this.productRepository.save(product)
    return product
  }
}
