'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/mockData';
import { StockBadge } from '@/components/StockBadge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

interface CarouselSectionProps {
  category: string;
  products: Product[];
}

export function CarouselSection({ category, products }: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  return (
    <section className="relative group/section">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">{category}</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => scroll('left')}
        className={`absolute left-2 sm:-left-5 top-[60%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-forest-800 border border-white/20 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-forest-700 hover:scale-110 ${canScrollLeft ? 'opacity-100 sm:opacity-0 sm:group-hover/section:opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className={`absolute right-2 sm:-right-5 top-[60%] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-forest-800 border border-white/20 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:bg-forest-700 hover:scale-110 ${canScrollRight ? 'opacity-100 sm:opacity-0 sm:group-hover/section:opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Horizontal Scrolling Carousel */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-6 lg:gap-8 pb-8 pt-2 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
      >
        {products.map((product, index) => (
          <ScrollReveal key={product.id} animationDelay={`${index * 100}ms`} className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] shrink-0 snap-start">
            <div className="glass-panel rounded-2xl overflow-hidden hover:translate-y-[-4px] hover:shadow-[0_32px_72px_rgba(0,0,0,0.52),0_0_48px_rgba(86,189,145,0.08)] transition-all duration-500 h-full flex flex-col relative before:absolute before:inset-[15%] before:-z-10 before:rounded-full before:blur-[48px] before:opacity-0 group-hover:before:opacity-30 before:bg-sf-500 before:transition-opacity">
              
              {/* Clickable Area for Product Detail */}
              <Link href={`/product/${product.id}`} className="group block flex-col flex-1 cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-forest-900 border-b border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <StockBadge status={product.stockStatus} />
                  </div>
                </div>
                <div className="p-5 pb-3 flex flex-col flex-1 relative z-10">
                  <h3 className="font-bold text-xl text-white mt-1 mb-2 leading-tight group-hover:text-sf-300 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-ink-500 mb-2">{product.packSize}</p>
                  <span className="text-2xl font-bold font-mono text-white mb-2">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </Link>

              {/* Quick Add Action Area */}
              <div className="p-5 pt-0 mt-auto z-20">
                {product.stockStatus === 'Out of Stock' ? (
                  <button 
                    disabled
                    className="w-full bg-forest-800 text-ink-500 font-bold py-2.5 rounded-xl border border-white/5 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product, 1);
                      addToast(`Added 1x ${product.name} to your cart.`);
                    }}
                    className="w-full bg-forest-800 border border-white/10 hover:bg-sf-500 hover:border-sf-400 hover:text-forest-900 text-sf-300 font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,168,126,0)] hover:shadow-[0_0_20px_rgba(0,168,126,0.4)]"
                  >
                    <Plus size={18} /> Quick Add
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
