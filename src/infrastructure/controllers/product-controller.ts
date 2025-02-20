import type {
  IFindProduct,
  ILoadProductsByCategory,
  IUpdateProduct,
  IDeleteProduct,
  ICreateProduct
} from '@/application/usecases/product'
import type { ProductCategory } from '@/domain/enums'
import type { HttpRequest, HttpResponse } from '@/infrastructure/http/interfaces'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import type { Controller } from '@/infrastructure/controllers/interfaces'

export interface CreateProductInput {
  name: string
  price: number
  description: string
  category: ProductCategory
}

interface UpdateProductInput extends Partial<CreateProductInput> {
  productId: string
}

export class CreateProductController implements Controller {
  constructor(private readonly createProductUseCase: ICreateProduct) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const input = request.body as CreateProductInput
    const result = await this.createProductUseCase.execute(input)
    return {
      statusCode: HttpStatusCode.CREATED,
      body: result.toJSON()
    }
  }
}

export class DeleteProductController implements Controller {
  constructor(private readonly deleteProductUseCase: IDeleteProduct) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params as { id: string }
    await this.deleteProductUseCase.execute(id)
    return {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: null
    }
  }
}

export class UpdateProductController implements Controller {
  constructor(private readonly updateProductUseCase: IUpdateProduct) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params as { id: string }
    const body = request.body as Partial<CreateProductInput>
    const input: UpdateProductInput = { ...body, productId: id }
    const result = await this.updateProductUseCase.execute(input)
    return {
      statusCode: HttpStatusCode.OK,
      body: result.toJSON()
    }
  }
}

export class LoadProductsByCategoryController implements Controller {
  constructor(private readonly loadProductsByCategoryUseCase: ILoadProductsByCategory) {}

  async handle(request: HttpRequest<null, null, { category: ProductCategory }>): Promise<HttpResponse> {
    const { category } = request.params
    const result = await this.loadProductsByCategoryUseCase.execute(category)
    return {
      statusCode: HttpStatusCode.OK,
      body: result.map((product) => product.toJSON())
    }
  }
}

export class FindProductController implements Controller {
  constructor(private readonly findProductUseCase: IFindProduct) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params as { id: string }
    const result = await this.findProductUseCase.execute({
      productId: id
    })
    return {
      statusCode: HttpStatusCode.OK,
      body: result.toJSON()
    }
  }
}
