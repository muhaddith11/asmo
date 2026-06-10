import { supabase } from './supabase'
import { CartItem } from './store'

export interface OrderInput {
  customerName: string
  phone: string
  address: string
  note?: string
  items: CartItem[]
  total: number
}

export async function createOrder(order: OrderInput): Promise<void> {
  const itemsJson = order.items.map((i) => ({
    id: i.product.id,
    name: i.product.nameUz,
    price: i.product.price,
    quantity: i.quantity,
    size: i.size,
    color: i.color,
  }))

  const { error } = await supabase.from('orders').insert({
    customer_name: order.customerName,
    phone: order.phone,
    address: order.address,
    note: order.note ?? '',
    items: itemsJson,
    total: order.total,
    status: 'pending',
  })

  if (error) throw error
}
