import { Product } from '@/domain/entities'
import { ProductCategory } from '@/domain/enums'

export const productMock = Product.create('Coca-Cola', ProductCategory.DRINK, 5, 'Coca-Cola 350ml')
