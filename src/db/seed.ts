import { db } from './index';
import { products } from './schema';

const sampleProducts = [
  {
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. Featuring Nike\'s biggest heel Air unit yet, it provides all-day comfort.',
    price: '150.00',
    category: 'Men',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Air+Max+270',
  },
  {
    name: 'Nike Air Force 1',
    description: 'The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash.',
    price: '110.00',
    category: 'Men',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Air+Force+1',
  },
  {
    name: 'Nike React Infinity Run',
    description: 'The Nike React Infinity Run Flyknit is designed to help reduce injury and keep you on the run. More foam and improved upper details provide a secure and cushioned feel.',
    price: '160.00',
    category: 'Women',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+React+Infinity',
  },
  {
    name: 'Nike Pegasus 40',
    description: 'Responsive cushioning in the Pegasus provides an energized ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units.',
    price: '140.00',
    category: 'Women',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Pegasus+40',
  },
  {
    name: 'Nike Dunk Low',
    description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors.',
    price: '115.00',
    category: 'Kids',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Dunk+Low',
  },
  {
    name: 'Nike Blazer Mid',
    description: 'The Nike Blazer Mid brings a classic look with premium leather and vintage styling. A padded collar provides comfort and support.',
    price: '100.00',
    category: 'Kids',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Blazer+Mid',
  },
  {
    name: 'Nike ZoomX Vaporfly',
    description: 'The Nike ZoomX Vaporfly NEXT% 2 is designed to help you run faster and longer. It features responsive cushioning and a carbon fiber plate.',
    price: '250.00',
    category: 'Men',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+ZoomX+Vaporfly',
  },
  {
    name: 'Nike Metcon 8',
    description: 'The Nike Metcon 8 is built for the grind of training. It provides stability for lifting and flexibility for cardio.',
    price: '150.00',
    category: 'Women',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Metcon+8',
  },
  {
    name: 'Nike Cortez',
    description: 'The Nike Cortez is a classic running shoe with a retro look. Featuring a foam midsole and herringbone outsole pattern for traction.',
    price: '80.00',
    category: 'Sale',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Cortez',
  },
  {
    name: 'Nike Joyride Run',
    description: 'The Nike Joyride Run Flyknit features tiny foam beads underfoot that conform to your foot for cushioning that stands the test of time.',
    price: '90.00',
    category: 'Sale',
    imageUrl: 'https://placehold.co/600x600/e5e5e5/666666?text=Nike+Joyride+Run',
  },
];

async function seed() {
  console.log('Seeding database...');
  
  try {
    // Clear existing products
    console.log('Clearing existing products...');
    await db.delete(products);
    console.log('✓ Existing products cleared');
    
    // Insert sample products
    await db.insert(products).values(sampleProducts);
    
    console.log('✓ Database seeded successfully!');
    console.log(`✓ Inserted ${sampleProducts.length} products`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
  
  process.exit(0);
}

seed();
