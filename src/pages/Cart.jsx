import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="mb-8 text-lg text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button variant="primary" size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Shopping Cart</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100 items-center">
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
                </Link>
                
                <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} className="font-semibold text-slate-900 hover:text-primary-600 line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-sm text-slate-500">{item.category}</p>
                    <p className="mt-1 font-bold text-slate-900">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-6 sm:mt-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-slate-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-slate-50 text-slate-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-slate-50 text-slate-600"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-slate-900 sm:hidden">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              <h2 className="mb-6 text-lg font-bold text-slate-900">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-slate-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Estimate (10%)</span>
                  <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-base font-bold text-slate-900">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Taxes and shipping calculated at checkout</p>
                </div>
              </div>

              <Link to="/checkout" className="mt-8 block">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
