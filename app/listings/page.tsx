
'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import GlassCard from '@/components/ui/GlassCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import BusinessCard from '@/components/BusinessCard';
import { mockBusinesses } from '@/lib/data';
import { BusinessCategory, CategoryFilter } from '@/types';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';
import PageWrapper from '@/components/PageWrapper';

const categories: BusinessCategory[] = ["Real Estate", "Car Rentals", "Health & Wellness", "Business Listings"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function ListingsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(searchParams.get('category') as BusinessCategory || 'All');
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filterCategories: CategoryFilter[] = ['All', ...categories];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 750);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    } else {
        params.delete('category');
    }

    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    } else {
        params.delete('search');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedCategory, debouncedSearchTerm, pathname, router, searchParams]);
  
  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter(business => {
      const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
      const matchesSearch = business.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                            business.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [debouncedSearchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      {/* FIX: The PageWrapper component requires a 'children' prop. The page content has been wrapped within PageWrapper. */}
      <PageWrapper>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <GlassCard className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-navy text-center">Business Listings</h1>
            <p className="text-center mt-2 text-gray-600">Discover the best businesses and services in Antigua & Barbuda.</p>
            
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                          type="text"
                          placeholder="Search listings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border-gray-300 focus:ring-2 focus:ring-brand-turquoise transition"
                      />
                  </div>
                  <button
                      onClick={clearFilters}
                      className="h-12 px-4 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition shrink-0"
                  >
                      <X size={16} />
                      Clear Filters
                  </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {filterCategories.map(cat => (
                      <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              selectedCategory === cat
                                  ? 'bg-brand-turquoise text-brand-navy shadow-md'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>
            </div>
          </GlassCard>
          
          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredBusinesses.map(business => (
                <motion.div key={business.id} variants={itemVariants} className="h-full">
                  <BusinessCard business={business} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <GlassCard className="text-center py-16">
              <h2 className="text-2xl font-bold text-brand-navy">No Listings Found</h2>
              <p className="mt-2 text-gray-600">Try adjusting your search or filters.</p>
            </GlassCard>
          )}
        </div>
      </PageWrapper>

      <Footer />
    </div>
  );
}

export default function ListingsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ListingsContent />
        </Suspense>
    )
}