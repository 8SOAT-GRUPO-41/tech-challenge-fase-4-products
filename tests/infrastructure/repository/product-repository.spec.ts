import type { MongoDBConnection } from '@/infrastructure/database/mongo-connection'
import { ProductRepositoryDatabase } from '@/infrastructure/repository/product-repository'
import { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'

describe('ProductRepositoryDatabase', () => {
  let mockDbConnection: MongoDBConnection
  let productRepository: ProductRepositoryDatabase

  beforeAll(() => {
    mockDbConnection = {
      getCollection: jest.fn().mockReturnValue({
        insertOne: jest.fn(),
        deleteOne: jest.fn(),
        findOne: jest.fn(),
        updateOne: jest.fn(),
        find: jest.fn().mockReturnValue({ toArray: jest.fn() })
      })
    } as unknown as MongoDBConnection
    productRepository = new ProductRepositoryDatabase(mockDbConnection)
  })

  it('should save a product', async () => {
    const product = Product.create('TestName', 'ELECTRONICS' as ProductCategory, 1000, 'TestDescription')
    await productRepository.save(product)
    expect(mockDbConnection.getCollection).toHaveBeenCalledWith('products')
    expect(mockDbConnection.getCollection('products').insertOne).toHaveBeenCalled()
  })

  it('should delete a product by id', async () => {
    await productRepository.delete('some-id')
    expect(mockDbConnection.getCollection).toHaveBeenCalledWith('products')
    expect(mockDbConnection.getCollection('products').deleteOne).toHaveBeenCalledWith({ product_id: 'some-id' })
  })

  //   it('should find a product by id', async () => {
  //     mockDbConnection.getCollection('products').findOne.mockResolvedValueOnce({
  //       product_id: 'some-id',
  //       name: 'TestName',
  //       category: 'BOOKS',
  //       price: 25,
  //       description: 'desc'
  //     })
  //     const found = await productRepository.findById('some-id')
  //     expect(found?.productId).toBe('some-id')
  //     expect(found?.getName()).toBe('TestName')
  //   })

  it('should update a product', async () => {
    const product = Product.restore('some-id', 'name', 'ELECTRONICS' as ProductCategory, 200, 'desc')
    await productRepository.update(product)
    expect(mockDbConnection.getCollection).toHaveBeenCalledWith('products')
    expect(mockDbConnection.getCollection('products').updateOne).toHaveBeenCalledWith(
      { product_id: 'some-id' },
      {
        name: 'name',
        price: 200,
        description: 'desc',
        category: 'ELECTRONICS'
      }
    )
  })

  it('should find products by category', async () => {
    const toArrayMock = mockDbConnection.getCollection('products').find().toArray as jest.Mock

    toArrayMock.mockResolvedValueOnce([
      { product_id: 'one', name: 'A', category: 'BOOKS', price: 10, description: 'descA' },
      { product_id: 'two', name: 'B', category: 'BOOKS', price: 20, description: 'descB' }
    ])

    const list = await productRepository.findByCategory('BOOKS')
    expect(list.length).toBe(2)
    expect(list[0].getName()).toBe('A')
  })

  it('should find a product by id', async () => {
    const record = {
      product_id: 'some-id',
      name: 'TestName',
      category: 'BOOKS',
      price: 25,
      description: 'desc'
    }
    const findOneMock = mockDbConnection.getCollection('products').findOne as jest.Mock
    findOneMock.mockResolvedValueOnce(record)
    const found = await productRepository.findById('some-id')
    expect(found?.productId).toBe('some-id')
    expect(found?.getName()).toBe('TestName')
  })

  it('should return null if product not found', async () => {
    const findOneMock = mockDbConnection.getCollection('products').findOne as jest.Mock
    findOneMock.mockResolvedValueOnce(null)
    const found = await productRepository.findById('some-id')
    expect(found).toBeNull()
  })
})
