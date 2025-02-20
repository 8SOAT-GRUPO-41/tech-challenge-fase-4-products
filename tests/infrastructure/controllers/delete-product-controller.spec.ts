import { DeleteProductController } from '@/infrastructure/controllers/product-controller'
import { DeleteProductSpy } from '@/tests/infrastructure/mocks/delete-product-spy'
import type { HttpRequest } from '@/infrastructure/http/interfaces'
import { HttpStatusCode } from '@/infrastructure/http/helper'

interface SutTypes {
  sut: DeleteProductController
  deleteProductSpy: DeleteProductSpy
}

const makeSut = (): SutTypes => {
  const deleteProductSpy = new DeleteProductSpy()
  const sut = new DeleteProductController(deleteProductSpy)
  return {
    sut,
    deleteProductSpy
  }
}

describe(DeleteProductController.name, () => {
  const request: HttpRequest<null, null, { id: string }> = {
    params: { id: 'any_id' },
    body: null,
    query: null
  }

  it('should call deleteProductUseCase with correct values', async () => {
    const { sut, deleteProductSpy } = makeSut()

    await sut.handle(request)

    expect(deleteProductSpy.lastId).toBe('any_id')
    expect(deleteProductSpy.callsCount).toBe(1)
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(HttpStatusCode.NO_CONTENT)
    expect(response.body).toBeNull()
  })
})
