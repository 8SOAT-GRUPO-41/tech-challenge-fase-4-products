import { UpdateProductController } from '@/infrastructure/controllers/product-controller'
import { UpdateProductSpy } from '@/tests/infrastructure/mocks/update-product-spy'
import type { HttpRequest } from '@/infrastructure/http/interfaces'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import type { CreateProductInput } from '@/infrastructure/controllers/product-controller'

interface SutTypes {
  sut: UpdateProductController
  updateProductSpy: UpdateProductSpy
}

const makeSut = (): SutTypes => {
  const updateProductSpy = new UpdateProductSpy()
  const sut = new UpdateProductController(updateProductSpy)
  return {
    sut,
    updateProductSpy
  }
}

describe(UpdateProductController.name, () => {
  const request: HttpRequest<Partial<CreateProductInput>, null, { id: string }> = {
    params: { id: 'any_id' },
    body: {
      name: 'updated_name',
      price: 99.99
    },
    query: null
  }

  it('should call updateProductUseCase with correct values', async () => {
    const { sut, updateProductSpy } = makeSut()

    await sut.handle(request)

    expect(updateProductSpy.lastInput?.productId).toBe('any_id')
    expect(updateProductSpy.lastInput?.name).toBe('updated_name')
    expect(updateProductSpy.lastInput?.price).toBe(99.99)
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(HttpStatusCode.OK)
  })
})
