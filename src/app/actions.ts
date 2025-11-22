'use server';

import { db } from '@/db';
import { products } from '@/db/schema';

export async function getProducts() {
  try {
    const allProducts = await db.select().from(products);
    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
