import type { ILoadProductsByCategory } from '@/application/usecases/product/load-products-by-category'
import type { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'
import { productMock } from '@/tests/domain/mocks'

export class LoadProductsByCategorySpy implements ILoadProductsByCategory {
  callsCount = 0
  lastCategory?: ProductCategory

  async execute(category: ProductCategory): Promise<Product[]> {
    this.callsCount++
    this.lastCategory = category
    return [productMock]
  }
}
