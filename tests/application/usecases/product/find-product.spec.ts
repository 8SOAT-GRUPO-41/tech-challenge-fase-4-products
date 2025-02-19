import { ProductRepositorySpy } from '@/tests/application/mocks'
import { FindProduct } from '@/application/usecases/product'

interface SutTypes {
  sut: FindProduct
  productRepositorySpy: ProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const productRepositorySpy = new ProductRepositorySpy()
  const sut = new FindProduct(productRepositorySpy)
  return {
    sut,
    productRepositorySpy
  }
}

const input = {
  productId: 'any_id'
}

describe(FindProduct.name, () => {
  it('should throw if findById throws', async () => {
    const { sut, productRepositorySpy } = makeSut()
    jest.spyOn(productRepositorySpy, 'findById').mockImplementationOnce(() => {
      throw new Error('Test throw')
    })

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow()
  })

  it('should call findById with correct values', async () => {
    const { sut, productRepositorySpy } = makeSut()

    await sut.execute(input)

    expect(productRepositorySpy.findByIdParams).toBe(input.productId)
  })

  it('should throw NotFoundError if product is not found', async () => {
    const { sut, productRepositorySpy } = makeSut()
    productRepositorySpy.findByIdResult = null

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow()
  })

  it('should return a product', async () => {
    const { sut, productRepositorySpy } = makeSut()

    const result = await sut.execute(input)

    expect(result).toBe(productRepositorySpy.findByIdResult)
  })
})
