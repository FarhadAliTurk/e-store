import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, ArrowLeft, Truck, ShieldCheck, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/features/ProductCard';
import products from '../data/products.json';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Find product
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
       <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
        <Link to="/shop">
          <Button variant="primary" className="mt-4">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  // Derived state
  const isWishlisted = isInWishlist(product.id);
  // Mock multiple images by using the same one + some placeholders/variants if available, 
  // or just reusing the main image for the gallery effect
  const images = [
    product.image, 
    // Just duplicating for demo purposes since mock data has only 1 image
    product.image + '?v=2', 
    product.image + '?v=3'
  ];

  // Related products (Same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const next = prev + delta;
      return next < 1 ? 1 : next > product.stock ? product.stock : next;
    });
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {images.map((img, idx) => (
                 <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${activeImage === idx ? 'border-primary-600' : 'border-slate-200'}`}
                 >
                   <img src={img} alt={`View ${idx}`} className="h-full w-full object-cover" />
                 </button>
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {product.category}
              </span>
              {product.stock > 0 ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">In Stock</span>
              ) : (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Out of Stock</span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{product.name}</h1>
            
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-slate-700">{product.rating}</span>
                <span className="text-slate-400">(128 reviews)</span>
              </div>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {product.description}
            </p>

            <div className="mt-8 border-t border-slate-200 py-8">
              <div className="flex flex-col sm:flex-row gap-6">
                 {/* Quantity */}
                 <div className="flex items-center rounded-lg border border-slate-300">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-slate-50 disabled:opacity-50"
                      disabled={quantity <= 1 || product.stock === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-slate-50 disabled:opacity-50"
                      disabled={quantity >= product.stock || product.stock === 0}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                 </div>

                 {/* Actions */}
                 <div className="flex flex-1 gap-4">
                   <Button 
                      className="flex-1 gap-2" 
                      size="lg"
                      onClick={() => {
                        addToCart(product.id, quantity);
                        addToast(`Added ${quantity} ${product.name}(s) to cart`);
                      }}
                      disabled={product.stock === 0}
                    >
                     <ShoppingCart className="h-5 w-5" /> Add to Cart
                   </Button>
                   <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => {
                        toggleWishlist(product.id);
                        addToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', isWishlisted ? 'info' : 'success');
                      }}
                      className={isWishlisted ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : ''}
                   >
                     <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                   </Button>
                   <Button variant="ghost" size="lg">
                     <Share2 className="h-5 w-5" />
                   </Button>
                 </div>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <Truck className="h-6 w-6 text-primary-600" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Free Delivery</p>
                  <p className="text-slate-500">Orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <ShieldCheck className="h-6 w-6 text-primary-600" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">2 Year Warranty</p>
                  <p className="text-slate-500">Full protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
