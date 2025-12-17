import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
    // In a real app, we'd persist the order here
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/shop')}>
          Go Shopping
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="rounded-full bg-green-100 p-6 text-green-600 mb-6">
          <CheckCircle className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-slate-600 max-w-md mb-8">
          Thank you for your purchase, {formData.firstName}. We've sent a confirmation email to {formData.email}.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary-600" onClick={() => navigate('/cart')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Button>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  placeholder="Last Name" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  placeholder="Email Address" 
                  name="email" 
                  type="email" 
                  className="col-span-2" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  placeholder="Street Address" 
                  name="address" 
                  className="col-span-2" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  placeholder="City" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  placeholder="ZIP / Postal Code" 
                  name="zip" 
                  value={formData.zip} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Details</h2>
              <div className="space-y-4">
                <Input 
                  placeholder="Cardholder Name" 
                  name="cardName" 
                  value={formData.cardName} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  placeholder="Card Number" 
                  name="cardNumber" 
                  value={formData.cardNumber} 
                  onChange={handleChange} 
                  maxLength={19}
                  required 
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="MM/YY" 
                    name="expiry" 
                    value={formData.expiry} 
                    onChange={handleChange} 
                    maxLength={5}
                    required 
                  />
                  <Input 
                    placeholder="CVC" 
                    name="cvc" 
                    value={formData.cvc} 
                    onChange={handleChange} 
                    maxLength={3}
                    required 
                  />
                </div>
              </div>
            </div>

            <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="h-fit bg-slate-100 p-6 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                   <div className="relative">
                     <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover bg-white" />
                     <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-slate-500 text-white text-xs flex items-center justify-center font-bold">
                        {item.quantity}
                     </span>
                   </div>
                   <div className="flex-1">
                     <h3 className="text-sm font-medium text-slate-900 line-clamp-1">{item.name}</h3>
                     <p className="text-sm text-slate-500">{item.category}</p>
                   </div>
                   <p className="text-sm font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
