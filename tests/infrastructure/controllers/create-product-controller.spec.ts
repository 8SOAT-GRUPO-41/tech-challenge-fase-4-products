import { CreateProductController } from '@/infrastructure/controllers/product-controller'
import { CreateProductSpy } from '@/tests/infrastructure/mocks/create-product-spy'
import type { HttpRequest } from '@/infrastructure/http/interfaces'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import type { CreateProductInput } from '@/infrastructure/controllers/product-controller'
import { ProductCategory } from '@/domain/enums'

interface SutTypes {
  sut: CreateProductController
  createProductSpy: CreateProductSpy
}

const makeSut = (): SutTypes => {
  const createProductSpy = new CreateProductSpy()
  const sut = new CreateProductController(createProductSpy)
  return {
    sut,
    createProductSpy
  }
}

describe(CreateProductController.name, () => {
  const request: HttpRequest<CreateProductInput> = {
    body: {
      name: 'any_name',
      price: 100,
      description: 'any_description',
      category: ProductCategory.DESSERT
    },
    params: null,
    query: null
  }

  it('should call createProductUseCase with correct values', async () => {
    const { sut, createProductSpy } = makeSut()

    await sut.handle(request)

    expect(createProductSpy.input?.name).toBe('any_name')
    expect(createProductSpy.input?.price).toBe(100)
    expect(createProductSpy.input?.description).toBe('any_description')
    expect(createProductSpy.input?.category).toBe('Sobremesa')
    expect(createProductSpy.callsCount).toBe(1)
  })

  it('should return 201 on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(HttpStatusCode.CREATED)
  })

  it('should return the created product in body on success', async () => {
    const { sut, createProductSpy } = makeSut()
    const response = await sut.handle(request)

    expect((response.body as any).name).toBe(createProductSpy.input?.name)
    expect((response.body as any).price).toBe(createProductSpy.input?.price)
    expect((response.body as any).description).toBe(createProductSpy.input?.description)
    expect((response.body as any).category).toBe(createProductSpy.input?.category)
  })
})
