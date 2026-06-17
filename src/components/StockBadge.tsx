import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Available Tomorrow' | 'Out of Stock';

export const StockBadge: React.FC<{ status: StockStatus }> = ({ status }) => {
  switch (status) {
    case 'In Stock':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-sf-500/20 text-sf-300 border border-sf-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,168,126,0.15)]">
          <CheckCircle2 size={14} /> {status}
        </span>
      );
    case 'Available Tomorrow':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber/20 text-amber border border-amber/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,140,0,0.15)]">
          <Clock size={14} /> {status}
        </span>
      );
    case 'Low Stock':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rust/20 text-rust border border-rust/30 backdrop-blur-md shadow-[0_0_15px_rgba(224,130,74,0.15)]">
          <AlertCircle size={14} /> {status}
        </span>
      );
    case 'Out of Stock':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-pen-red/20 text-pen-red border border-pen-red/30 backdrop-blur-md shadow-[0_0_15px_rgba(232,103,76,0.15)]">
          <AlertCircle size={14} /> {status}
        </span>
      );
    default:
      return null;
  }
};
