'use client'

import { useParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { ProductForm } from '@/components/product-form'
import Link from 'next/link'

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const { products } = useStore()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Mahsulot topilmadi</p>
        <Link href="/admin/products" className="text-primary hover:underline text-sm">
          Mahsulotlarga qaytish
        </Link>
      </div>
    )
  }

  return <ProductForm mode="edit" initialData={product} />
}
