import Image from "next/image";
import { getProducts } from "./actions";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Nike Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover our latest Nike shoes across all categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {product.category}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">No products found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
