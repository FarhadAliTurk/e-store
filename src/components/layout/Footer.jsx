import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">StoreFront</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Your one-stop destination for premium products. Quality meets affordability in our curated collection.
            </p>
             <div className="flex gap-4">
              <a href="#" className="hover:text-primary-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-primary-500 transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="hover:text-primary-500 transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-500 transition-colors">Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>
             <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary-500" />
                <span>123 Commerce St, Market City, ST 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary-500" />
                <span>support@storefront.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} StoreFront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
