import { OrderItem } from '@/domain/entities'
import { productMock } from '@/tests/domain/mocks'

export const orderItemMock = OrderItem.create(productMock, 2)
