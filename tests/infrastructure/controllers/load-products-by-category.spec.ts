import { LoadProductsByCategoryController } from '@/infrastructure/controllers/product-controller'
import { LoadProductsByCategorySpy } from '@/tests/infrastructure/mocks/load-products-by-category-spy'
import type { HttpRequest } from '@/infrastructure/http/interfaces'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import type { ProductCategory } from '@/domain/enums'

interface SutTypes {
  sut: LoadProductsByCategoryController
  loadProductsByCategorySpy: LoadProductsByCategorySpy
}

const makeSut = (): SutTypes => {
  const loadProductsByCategorySpy = new LoadProductsByCategorySpy()
  const sut = new LoadProductsByCategoryController(loadProductsByCategorySpy)
  return {
    sut,
    loadProductsByCategorySpy
  }
}

describe(LoadProductsByCategoryController.name, () => {
  const request: HttpRequest<null, null, { category: ProductCategory }> = {
    params: {
      category: 'any_category' as ProductCategory
    },
    body: null,
    query: null
  }

  it('should call loadProductsByCategoryUseCase with correct values', async () => {
    const { sut, loadProductsByCategorySpy } = makeSut()

    await sut.handle(request)

    expect(loadProductsByCategorySpy.lastCategory).toBe('any_category')
    expect(loadProductsByCategorySpy.callsCount).toBe(1)
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(HttpStatusCode.OK)
  })

  it('should return an array of products in the body', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(request)

    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toHaveLength(1)
  })
})
