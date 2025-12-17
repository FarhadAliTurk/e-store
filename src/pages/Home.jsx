import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Clock } from 'lucide-react';
import ProductCard from '../components/features/ProductCard';
import Button from '../components/ui/Button';
import products from '../data/products.json';

const Home = () => {
  // Get featured products (e.g., top rated or random slice)
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&q=80&w=500' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=500' },
    { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=500' },
    { name: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=500' },
  ];

  const features = [
    { icon: Truck, title: 'Free Shipping', text: 'On orders over $100' },
    { icon: ShieldCheck, title: 'Secure Payment', text: '100% protected payments' },
    { icon: Clock, title: '24/7 Support', text: 'Dedicated support' },
    { icon: ShoppingBag, title: 'Easy Returns', text: '30-day return policy' },
  ];

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero Background" 
            className="h-full w-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="container relative mx-auto flex h-full flex-col justify-center px-4 text-white">
          <span className="mb-4 inline-block max-w-max rounded-full bg-primary-600/20 px-4 py-1.5 text-sm font-semibold text-primary-300 backdrop-blur-sm border border-primary-500/30">
            Winter Collection 2025
          </span>
          <h1 className="mb-6 max-w-2xl text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Discover the Future of Shopping
          </h1>
          <p className="mb-8 max-w-xl text-lg text-slate-300">
             Explore our curated collection of premium electronics, fashion, and home goods. Designed for modern living.
          </p>
          <div className="flex gap-4">
            <Link to="/shop">
              <Button size="lg" className="rounded-full px-8">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/shop?category=Electronics">
              <Button variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white hover:text-slate-900 px-8">
                View Electronics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
         <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Shop by Category</h2>
          <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700">View all categories &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={`/shop?category=${cat.name}`}
              className="group relative h-64 overflow-hidden rounded-2xl bg-slate-100"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <span className="mt-2 inline-block text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                  Shop Now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Featured Products</h2>
              <p className="mt-2 text-slate-600">Top picks for you based on current trends.</p>
            </div>
            <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700">View all &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

       {/* Banner */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center text-white sm:px-12 md:py-24">
           {/* Abstract Background Blobs */}
           <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-primary-600/30 blur-3xl" />
           <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-purple-600/30 blur-3xl" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="mb-4 text-3xl font-bold md:text-5xl">Join Our Membership</h2>
             <p className="mb-8 text-lg text-slate-300">
               Sign up today and get exclusive access to members-only sales, new releases, and a 15% discount on your first order.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full rounded-full px-6 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
               />
               <Button size="lg" className="rounded-full whitespace-nowrap">Subscribe</Button>
             </div>
           </div>
        </div>
      </section>

      {/* New Arrivals (Reusing grid for visual density) */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold text-slate-900 md:text-3xl">New Arrivals</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
