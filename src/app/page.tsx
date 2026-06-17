'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { CarouselSection } from '@/components/CarouselSection';
import { useSearch } from '@/context/SearchContext';

export default function Home() {
  const { searchQuery } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, typeof mockProducts> = {};
    filteredProducts.forEach(product => {
      if (!groups[product.category]) groups[product.category] = [];
      groups[product.category].push(product);
    });
    return groups;
  }, [filteredProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex flex-wrap justify-center text-center items-center gap-2 font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.26em] uppercase text-gold mb-4">
          <div className="hidden sm:block w-6 h-px bg-gradient-to-r from-transparent to-gold"></div>
          Restaurant Procurement
          <div className="hidden sm:block w-6 h-px bg-gradient-to-l from-transparent to-gold"></div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 leading-[1.04] tracking-tight">
          Sourcing the <span className="text-gold italic font-bold">Finest</span> Ingredients
        </h1>
        <p className="text-ink-300 font-serif italic text-lg max-w-2xl mx-auto border-l border-white/10 pl-5">
          Browse fresh produce and bulk goods for your restaurant.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mb-12 flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-amber-2 to-amber text-forest-900 shadow-[0_0_15px_rgba(251,146,60,0.3)]' 
                : 'bg-forest-800 text-ink-300 border border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl">
            <Search size={48} className="mx-auto text-ink-500 mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-white mb-2">No ingredients found</h3>
            <p className="text-ink-300">Try adjusting your search or selected category.</p>
            <button 
              onClick={() => {
                setSelectedCategory('All');
              }}
              className="mt-6 px-6 py-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, products]) => (
            <CarouselSection key={category} category={category} products={products} />
          ))
        )}
      </div>
    </div>
  );
}
