'use client';

import { useState } from 'react';
import { Product } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/QuantitySelector';
import { StockBadge } from '@/components/StockBadge';
import { ShoppingCart, Heart, Share2, Info, ArrowLeft, Truck, Check } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  
  const isOutOfStock = product.stockStatus === 'Out of Stock';

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`Added ${quantity}x ${product.name} to your cart.`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <Link href="/" className="inline-flex items-center gap-2 text-ink-300 hover:text-gold mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Catalog
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="glass-panel rounded-3xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-sf-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto aspect-square object-cover"
          />
        </div>
        
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.08em] uppercase px-3 py-1.5 rounded-full bg-forest-800 border border-white/10 text-gold">
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-serif text-white mb-4 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <StockBadge status={product.stockStatus} />
            <span className="text-ink-500 font-mono text-sm tracking-widest uppercase">SKU: {product.id}</span>
          </div>
          
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold font-mono text-white">${product.price.toFixed(2)}</span>
              <span className="text-ink-300 mb-1 font-serif italic text-lg">/ {product.packSize}</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Info size={100} />
            </div>
            <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2 relative z-10">
              <Info size={18} className="text-gold" /> Product Details
            </h3>
            <p className="text-ink-200 leading-relaxed relative z-10">
              {product.description}
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl mb-8 border border-sf-500/20 bg-gradient-to-b from-sf-500/5 to-transparent">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingCart size={18} className="text-sf-300" /> Order Quantity
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
              <div className="text-sm font-mono text-ink-300">
                <p>Subtotal: <span className="text-white font-bold ml-2">${(product.price * quantity).toFixed(2)}</span></p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex gap-4">
                <Button 
                  variant={isOutOfStock ? "outline" : "primary"} 
                  size="lg" 
                  className={`flex-1 text-lg group overflow-hidden relative ${isOutOfStock ? 'border-gold text-gold hover:bg-gold/10 focus:ring-gold shadow-[0_0_15px_rgba(240,201,122,0.15)]' : ''}`}
                  onClick={handleAddToCart}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                  {added ? (
                    <>
                      <Check className="mr-2" size={24} /> {isOutOfStock ? 'Advance Ordered' : 'Added'}
                    </>
                  ) : isOutOfStock ? (
                    <>
                      Advance Order
                    </>
                  ) : (
                    <>
                      Add to Order
                    </>
                  )}
                </Button>
                <Button variant="secondary" size="lg" className="px-5">
                  <Heart size={24} />
                </Button>
              </div>
              {isOutOfStock && (
                <p className="text-sm text-gold/90 text-center mt-1">
                  Advance orders get first priority when stock arrives.
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 border border-white/10 flex items-center justify-center text-ink-300 flex-shrink-0">
                <Truck size={18} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Delivery Estimate</h4>
                <p className="text-xs text-ink-500 mt-0.5">Arrives by tomorrow 9AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 border border-white/10 flex items-center justify-center text-ink-300 flex-shrink-0">
                <Share2 size={18} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Share Item</h4>
                <p className="text-xs text-ink-500 mt-0.5">Send to kitchen manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
