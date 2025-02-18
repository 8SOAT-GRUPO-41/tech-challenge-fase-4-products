import type { ProductRepository } from '@/application/ports/product-repository'
import { Product } from '@/domain/entities'
import type { ProductCategory } from '@/domain/enums'
import type { MongoDBConnection } from '@/infrastructure/database/mongo-connection'

interface ProductDocument {
  product_id: string
  name: string
  category: ProductCategory
  price: number
  description: string
}

export class ProductRepositoryDatabase implements ProductRepository {
  private readonly collectionName = 'products'

  constructor(private readonly databaseConnection: MongoDBConnection) {}

  async save(product: Product) {
    const productsCollection = this.databaseConnection.getCollection(this.collectionName)
    await productsCollection.insertOne({
      product_id: product.productId,
      name: product.getName(),
      price: product.getPrice(),
      description: product.getDescription(),
      category: product.getCategory()
    })
  }

  async delete(productId: string) {
    const productsCollection = this.databaseConnection.getCollection(this.collectionName)
    await productsCollection.deleteOne({ product_id: productId })
  }

  async findById(id: string): Promise<Product | null> {
    const productsCollection = this.databaseConnection.getCollection<ProductDocument>(this.collectionName)
    const record = await productsCollection.findOne({ product_id: id })
    if (!record) return null
    return Product.restore(record.product_id, record.name, record.category, +record.price, record.description)
  }

  async update(product: Product) {
    const productsCollection = this.databaseConnection.getCollection(this.collectionName)
    await productsCollection.updateOne(
      { product_id: product.productId },
      {
        name: product.getName(),
        price: product.getPrice(),
        description: product.getDescription(),
        category: product.getCategory()
      }
    )
  }

  async findByCategory(category: string): Promise<Product[]> {
    const productsCollection = this.databaseConnection.getCollection<ProductDocument>(this.collectionName)
    const records = await productsCollection
      .find({
        category: category as ProductCategory
      })
      .toArray()
    return records.map((record) =>
      Product.restore(record.product_id, record.name, record.category, +record.price, record.description)
    )
  }
}
