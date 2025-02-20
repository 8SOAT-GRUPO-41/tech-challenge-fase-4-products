import { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'
import type { ICreateProduct } from '@/application/usecases/product/create-product'

type Input = {
  name: string
  category: ProductCategory
  price: number
  description: string
}

export class CreateProductSpy implements ICreateProduct {
  callsCount = 0
  input?: Input

  async execute(params: Input): Promise<Product> {
    this.callsCount++
    this.input = params
    return Product.create(params.name, params.category, params.price, params.description)
  }
}
