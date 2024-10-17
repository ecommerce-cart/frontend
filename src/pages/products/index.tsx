import AppLayout from '@/layouts/App.layout'
import { useProducts } from '@/network/product.api'
import Product from '@/components/app/Product/Product'

export default function Home() {
  const { products } = useProducts()
  return (
    <AppLayout>
      <section className="m-auto">
        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
