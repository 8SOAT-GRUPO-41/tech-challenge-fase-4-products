import {
  CreateProductController,
  DeleteProductController,
  LoadProductsByCategoryController,
  UpdateProductController,
  FindProductController
} from '@/infrastructure/controllers/product-controller'
import {
  makeCreateProduct,
  makeDeleteProduct,
  makeUpdateProduct,
  makeLoadProductsByCategory,
  makeFindProduct
} from '@/infrastructure/factories/usecases/product'
import type { Controller } from '@/infrastructure/controllers/interfaces'

export const makeCreateProductController = (): Controller => {
  return new CreateProductController(makeCreateProduct())
}

export const makeDeleteProductController = (): Controller => {
  return new DeleteProductController(makeDeleteProduct())
}

export const makeUpdateProductController = (): Controller => {
  return new UpdateProductController(makeUpdateProduct())
}

export const makeLoadProductsByCategoryController = (): Controller => {
  return new LoadProductsByCategoryController(makeLoadProductsByCategory())
}

export const makeFindProductController = (): Controller => {
  return new FindProductController(makeFindProduct())
}
