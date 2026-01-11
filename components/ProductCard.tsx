
import React from 'react';
import { Product } from '../types';
import { Star, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const CategoryMap: Record<string, string> = {
  'Wellness': '亲密康养',
  'Apparel': '精致服饰',
  'Atmosphere': '氛围营造',
  'Essentials': '必备私享'
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col bg-zinc-900/40 rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/30 transition-all duration-500">
      <div className="aspect-[3/4] overflow-hidden bg-zinc-800">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        {product.isDiscrete && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] text-zinc-300 border border-white/10 uppercase tracking-wider">
            私密发货
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-rose-500 font-bold tracking-widest uppercase">{CategoryMap[product.category] || product.category}</p>
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <Star size={12} className="fill-rose-500 text-rose-500" />
            {product.rating}
          </div>
        </div>
        
        <h3 className="text-lg font-serif font-medium text-zinc-100 group-hover:text-white mb-2 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-zinc-500 line-clamp-2 mb-6 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-medium text-zinc-200">¥{product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-2 bg-white text-black rounded-full hover:bg-rose-500 hover:text-white transition-all transform active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
