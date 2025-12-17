import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id);
    addToast(`Added ${product.name} to cart`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
    if (isInWishlist(product.id)) {
      addToast('Removed from wishlist', 'info');
    } else {
      addToast('Added to wishlist', 'success');
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative block overflow-hidden rounded-lg border border-slate-200 bg-white transition-all hover:shadow-lg">
      <button
        onClick={handleToggleWishlist}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-slate-400 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500"
      >
        <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock === 0 && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold backdrop-blur-[1px]">
             Out of Stock
           </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-sm text-slate-500">{product.category}</h3>
        <h2 className="mb-2 text-lg font-semibold text-slate-900 line-clamp-1">{product.name}</h2>
        
        <div className="mb-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-slate-700">{product.rating}</span>
          <span className="text-sm text-slate-400">({Math.floor(Math.random() * 50) + 10})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            variant="primary" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
