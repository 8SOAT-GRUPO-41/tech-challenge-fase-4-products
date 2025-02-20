import { FindProductController } from '@/infrastructure/controllers'
import { FindProductSpy } from '@/tests/infrastructure/mocks'
import type { HttpRequest } from '@/infrastructure/http/interfaces'

interface SutTypes {
  sut: FindProductController
  findProductSpy: FindProductSpy
}

const makeSut = (): SutTypes => {
  const findProductSpy = new FindProductSpy()
  const sut = new FindProductController(findProductSpy)
  return {
    sut,
    findProductSpy
  }
}

const request: Partial<HttpRequest> = {
  params: {
    id: 'any_id'
  }
}

describe(FindProductController.name, () => {
  it('should call findProduct with correct values', async () => {
    const { sut, findProductSpy } = makeSut()

    await sut.handle(request as HttpRequest)

    expect(findProductSpy.executeParams?.productId).toBe('any_id')
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(request as HttpRequest)

    expect(response.statusCode).toBe(200)
  })
})
