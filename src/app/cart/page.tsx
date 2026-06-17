'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, CheckCircle, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { QuantitySelector } from '@/components/QuantitySelector';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart: removeItem, clearCart } = useCart();
  const { addToast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [exitingItems, setExitingItems] = useState<Set<string>>(new Set());

  const handleRemove = (product: any) => {
    setExitingItems(prev => new Set(prev).add(product.id));
    addToast(`Removed ${product.name} from your cart.`);
    
    // Wait for the exit animation to complete before removing from context
    setTimeout(() => {
      removeItem(product.id);
      setExitingItems(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 400);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 200 ? 0 : 25;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center relative z-10">
        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-sf-500 to-sf-300 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(0,168,126,0.5)]">
          <CheckCircle size={48} className="text-forest-900" />
        </div>
        <h1 className="text-5xl font-bold font-serif text-white mb-6">Order Received</h1>
        <p className="text-xl text-ink-200 mb-12 max-w-lg mx-auto">
          Your premium order #SF-{Math.floor(Math.random() * 10000)} has been confirmed and is scheduled for delivery tomorrow.
        </p>
        <Link href="/">
          <Button variant="premium" size="lg">Continue Sourcing</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-ink-300 hover:text-gold mb-4 transition-colors">
            <ArrowLeft size={18} /> Continue Sourcing
          </Link>
          <h1 className="text-4xl font-bold font-serif text-white flex items-center gap-4">
            <Package className="text-gold" size={32} /> Your Cart
          </h1>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-ink-500 font-mono text-sm uppercase tracking-widest">Order Subtotal</p>
          <p className="text-3xl font-bold font-mono text-white">${subtotal.toFixed(2)}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <Package size={64} className="mx-auto text-ink-500 mb-6 opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-ink-300 mb-8">Looks like you haven&apos;t added any ingredients yet.</p>
          <Link href="/">
            <Button variant="primary" size="lg">Browse Catalog</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div 
                key={item.product.id} 
                className={`glass-panel p-5 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center relative group transition-all duration-400 ease-out transform origin-left ${exitingItems.has(item.product.id) ? 'opacity-0 scale-95 translate-x-10 pointer-events-none' : 'opacity-100 scale-100 translate-x-0'}`}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 border border-white/5 relative bg-forest-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-gold">{item.product.category}</span>
                        {item.product.stockStatus === 'Out of Stock' && (
                          <span className="font-mono text-[9px] font-bold tracking-widest uppercase bg-pen-red/10 text-pen-red border border-pen-red/30 px-2 py-0.5 rounded-sm">
                            Advance Order
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-xl text-white truncate">{item.product.name}</h3>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.product)} 
                      className="text-ink-500 hover:text-pen-red transition-colors p-2 bg-forest-800 rounded-lg border border-white/5 hover:bg-pen-red/10 hover:border-pen-red/30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-ink-300 text-sm mb-4">{item.product.packSize} • ${item.product.price.toFixed(2)} / ea</p>
                  <div className="flex items-center justify-between">
                    <QuantitySelector 
                      quantity={item.quantity} 
                      onChange={(q) => updateQuantity(item.product.id, q)} 
                    />
                    <div className="text-right">
                      <span className="text-xl font-bold font-mono text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-2xl sticky top-28 border-t-4 border-t-gold">
              <h2 className="text-xl font-bold font-serif text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm border-b border-white/10 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-ink-300">Subtotal ({items.length} items)</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-300">Delivery Fee</span>
                  <span className="font-mono text-white">
                    {deliveryFee === 0 ? <span className="text-sf-400 font-bold tracking-wider uppercase text-xs">Free</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-gold/80 italic mt-2">
                    Add ${(200 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-3xl font-bold font-mono text-gold">${total.toFixed(2)}</span>
              </div>
              
              <Button 
                variant="premium" 
                size="lg" 
                className="w-full text-lg relative overflow-hidden group"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                {isCheckingOut ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-forest-900/30 border-t-forest-900 rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  'Confirm Order'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
