import { mockProducts } from '@/data/mockData';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
