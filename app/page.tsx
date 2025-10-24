'use client';

import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import { Building, Car, HeartPulse, Search, Store } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockBusinesses } from '@/lib/data';
import BusinessCard from '@/components/BusinessCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const categories = [
  { name: 'Real Estate', icon: <Building className="w-12 h-12 text-brand-turquoise" />, href: '/listings?category=Real+Estate' },
  { name: 'Car Rentals', icon: <Car className="w-12 h-12 text-brand-turquoise" />, href: '/listings?category=Car+Rentals' },
  { name: 'Health & Wellness', icon: <HeartPulse className="w-12 h-12 text-brand-turquoise" />, href: '/listings?category=Health+%26+Wellness' },
  { name: 'Business Listings', icon: <Store className="w-12 h-12 text-brand-turquoise" />, href: '/listings?category=Business+Listings' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const featuredBusinesses = mockBusinesses.filter(b => b.featured);

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      router.push(`/listings?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/listings');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white">
           <Image
              src="https://picsum.photos/seed/antigua/1920/1080"
              alt="Beautiful scenery of Antigua"
              fill
              priority
              className="object-cover -z-10"
            />
          <div className="absolute inset-0 bg-brand-navy bg-opacity-50"></div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
            >
              Orbit
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 font-light drop-shadow-md"
            >
              Where Business Revolves in Antigua & Barbuda
            </motion.p>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full max-w-2xl"
            >
              <GlassCard className="!p-4">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search for businesses, services, or properties..."
                      className="w-full h-14 pl-12 pr-4 rounded-xl border-none focus:ring-2 focus:ring-brand-turquoise transition"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto h-14">Search</Button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Explore Categories</h2>
              <p className="mt-4 text-lg text-gray-600">Find what you're looking for in Antigua & Barbuda</p>
            </div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {categories.map((category) => (
                <motion.div key={category.name} variants={itemVariants}>
                  <Link href={category.href}>
                    <GlassCard className="text-center h-full hover:scale-105 hover:shadow-xl transform-gpu">
                      <div className="flex justify-center mb-4">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy">{category.name}</h3>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="py-16 sm:py-24 bg-white">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Featured Listings</h2>
              <p className="mt-4 text-lg text-gray-600">Check out these top-rated businesses</p>
            </div>
             <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {featuredBusinesses.map(business => (
                <motion.div key={business.id} variants={itemVariants}>
                    <BusinessCard business={business} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}