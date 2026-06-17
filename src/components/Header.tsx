'use client';

import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';
import { useEffect, useState, useRef } from 'react';

export function Header() {
  const { totalItems } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const [isShaking, setIsShaking] = useState(false);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 400);
      prevTotal.current = totalItems;
      return () => clearTimeout(timer);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  return (
    <header className="sticky top-0 z-50 w-full bg-forest-900/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      {/* Top glowing rule */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-bronze to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group max-w-[75%]">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg group-hover:border-gold transition-colors bg-forest-900 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Starfruit Express Logo" className="w-full h-full object-cover animate-logo" />
          </div>
          <span className="font-serif font-bold text-lg sm:text-2xl tracking-tight text-white drop-shadow-md truncate">
            Starfruit<span className="text-gold italic font-bold">Express</span>
          </span>
        </Link>
        
        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" size={16} />
          <input 
            type="text" 
            placeholder="Search ingredients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-forest-800/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder:text-ink-500 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
          />
        </div>
        
        <Link 
          href="/cart" 
          className={`relative p-3 text-ink-300 hover:text-gold transition-colors rounded-full hover:bg-white/5 ${isShaking ? 'animate-cart-shake text-gold' : ''}`}
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-2 to-amber text-[10px] font-bold text-forest-900 shadow-[0_0_10px_rgba(251,146,60,0.5)]">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
