import { MongoDBConnection } from '@/infrastructure/database/mongo-connection'
import { MongoClient } from 'mongodb'

describe('MongoDBConnection', () => {
  let connection: MongoDBConnection
  const dummyUrl = 'mongodb://localhost:27017'
  let fakeClient: any
  let fakeDb: any

  beforeAll(() => {
    process.env.MONGO_URL = dummyUrl
  })

  beforeEach(() => {
    ;(MongoDBConnection as any).instance = undefined

    fakeDb = {
      collection: jest.fn().mockReturnValue('collectionInstance')
    }
    fakeClient = {
      db: jest.fn().mockReturnValue(fakeDb),
      close: jest.fn().mockResolvedValue(undefined)
    }
    jest.spyOn(MongoClient, 'connect').mockResolvedValue(fakeClient)
    connection = MongoDBConnection.getInstance()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should create a new instance if none exists', () => {
    const instance1 = MongoDBConnection.getInstance()
    const instance2 = MongoDBConnection.getInstance()
    expect(instance1).toBe(instance2)
  })

  it('should open a connection', async () => {
    await connection.open()
    expect(MongoClient.connect).toHaveBeenCalledWith(dummyUrl)
    const collection = connection.getCollection('testCollection')
    expect(fakeClient.db).toHaveBeenCalledWith('products')
    expect(fakeDb.collection).toHaveBeenCalledWith('testCollection')
    expect(collection).toBe('collectionInstance')
  })

  it('should close the connection', async () => {
    await connection.open()
    await connection.close()
    expect(fakeClient.close).toHaveBeenCalled()
  })

  it('should map a document by replacing _id with id', () => {
    const data = { _id: '12345', field: 'value' }
    const mapped = connection.map(data)
    expect(mapped).toEqual({ id: '12345', field: 'value' })
  })

  it('should map an array of documents', () => {
    const dataArray = [
      { _id: '1', a: 1 },
      { _id: '2', b: 2 }
    ]
    const mappedArray = connection.mapCollection(dataArray)
    expect(mappedArray).toEqual([
      { id: '1', a: 1 },
      { id: '2', b: 2 }
    ])
  })
})
