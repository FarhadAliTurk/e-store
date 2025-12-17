import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Header = () => {
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
            <ShoppingBackagIcon className="h-8 w-8" />
            <span>StoreFront</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors">
              Shop
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md items-center gap-2">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
             {/* Mobile Search Toggle (Optional - keeping simple for now) */}

            <Link to="/wishlist" className="relative p-2 text-slate-700 hover:text-primary-600 transition-colors">
              <Heart className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-slate-700 hover:text-primary-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {user ? (
               <div className="group relative">
                  <button className="flex items-center gap-2 p-1 rounded-full border border-slate-200 hover:border-primary-200 transition-colors">
                     <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block hover:block animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 text-sm text-slate-700 border-b border-slate-100">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button onClick={logout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
               </div>
            ) : (
               <Link to="/login">
                 <Button variant="primary" size="sm">Login</Button>
               </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
             <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="primary">
                <Search className="h-4 w-4" />
              </Button>
          </form>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="block px-4 py-2 text-sm font-medium hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block px-4 py-2 text-sm font-medium hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

// Helper icon
const ShoppingBackagIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default Header;
