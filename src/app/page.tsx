import React from 'react'
import Card from '@/components/Card'

// Sample shoe data
const latestShoes = [
  {
    id: '1',
    title: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. Featuring Nike\'s biggest heel Air unit yet, it provides all-day comfort.',
    price: 150.00,
    image: '/shoes/shoe-1.jpg',
    category: 'Men',
    isNew: true
  },
  {
    id: '2',
    title: 'Nike Air Force 1',
    description: 'The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best.',
    price: 110.00,
    image: '/shoes/shoe-2.webp',
    category: 'Men'
  },
  {
    id: '3',
    title: 'Nike React Infinity Run',
    description: 'The Nike React Infinity Run Flyknit is designed to help reduce injury and keep you on the run.',
    price: 160.00,
    image: '/shoes/shoe-3.webp',
    badge: 'Sale',
    badgeColor: 'red',
    category: 'Women'
  },
  {
    id: '4',
    title: 'Nike Pegasus 40',
    description: 'Responsive cushioning in the Pegasus provides an energized ride for everyday road running.',
    price: 140.00,
    image: '/shoes/shoe-4.webp',
    category: 'Women'
  }
];

const Home = () => {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">

      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8">Latest Shoes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestShoes.map((shoe) => (
            <Card
              key={shoe.id}
              id={shoe.id}
              title={shoe.title}
              description={shoe.description}
              price={shoe.price}
              image={shoe.image}
              badge={shoe.badge}
              badgeColor={shoe.badgeColor}
              category={shoe.category}
              isNew={shoe.isNew}
              href={`/product/${shoe.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
