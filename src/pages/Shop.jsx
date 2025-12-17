import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/features/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import products from '../data/products.json';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filter States
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('popularity'); // popularity, price-asc, price-desc
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Sync state with URL params on mount/update
  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    if (cat) setCategory(cat);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // Derived Categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category Filter
      if (category !== 'All' && product.category !== category) return false;
      
      // Price Filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      
      // Search Filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default / Popularity (using rating as proxy for now)
      return b.rating - a.rating;
    });
  }, [category, priceRange, sortBy, searchQuery]);

  // Handlers
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setCategory('All');
    setPriceRange([0, 3000]);
    setSortBy('popularity');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Shop All Products</h1>
            <p className="text-slate-500">{filteredProducts.length} items found</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4" /> Filters
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className={`
            fixed inset-y-0 left-0 z-40 w-64 transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:static md:block md:w-64 md:transform-none md:bg-transparent md:p-0 md:shadow-none
            ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="flex items-center justify-between md:hidden mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}><X className="h-6 w-6" /></button>
            </div>

            <div className="space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`text-sm hover:text-primary-600 transition-colors ${category === cat ? 'font-bold text-primary-600' : 'text-slate-600'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">$</span>
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="h-8"
                    />
                    <span className="text-slate-400">-</span>
                    <span className="text-sm text-slate-500">$</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="h-8"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isMobileFiltersOpen && (
            <div 
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-sm">
                <SearchIcon className="mb-4 h-12 w-12 text-slate-300" />
                <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                <p className="mt-1 text-slate-500">Try adjusting your filters or search criteria.</p>
                <Button variant="primary" className="mt-4" onClick={handleClearFilters}>Clear All Filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

export default Shop;
