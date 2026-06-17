import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onChange, min = 1 }) => {
  return (
    <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-forest-900/50 shadow-inner w-fit">
      <button 
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="p-2.5 text-ink-300 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={quantity <= min}
      >
        <Minus size={16} />
      </button>
      <div className="px-4 py-2 font-mono font-bold text-white min-w-[3.5rem] text-center border-x border-white/5">
        {quantity}
      </div>
      <button 
        onClick={() => onChange(quantity + 1)}
        className="p-2.5 text-ink-300 hover:bg-white/5 hover:text-white transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
