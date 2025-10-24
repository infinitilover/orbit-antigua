
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image src="/logo.svg" alt="Orbit Logo" width={120} height={40} className="bg-white p-2 rounded-lg" />
            <p className="mt-4 text-gray-300 text-sm">Where Business Revolves in Antigua & Barbuda.</p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="text-gray-300 hover:text-brand-turquoise"><Facebook /></Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-gray-300 hover:text-brand-turquoise"><Instagram /></Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="text-gray-300 hover:text-brand-turquoise"><Twitter /></Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/listings" className="text-gray-300 hover:text-brand-turquoise">All Listings</Link></li>
              <li><Link href="/login" className="text-gray-300 hover:text-brand-turquoise">Login</Link></li>
              <li><Link href="/signup" className="text-gray-300 hover:text-brand-turquoise">Sign Up</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-brand-turquoise">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Categories</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/listings?category=Real+Estate" className="text-gray-300 hover:text-brand-turquoise">Real Estate</Link></li>
              <li><Link href="/listings?category=Car+Rentals" className="text-gray-300 hover:text-brand-turquoise">Car Rentals</Link></li>
              <li><Link href="/listings?category=Health+%26+Wellness" className="text-gray-300 hover:text-brand-turquoise">Health & Wellness</Link></li>
              <li><Link href="/listings?category=Business+Listings" className="text-gray-300 hover:text-brand-turquoise">Business Listings</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="text-lg font-bold text-white">Newsletter</h3>
            <p className="mt-4 text-gray-300">Subscribe for the latest deals and updates.</p>
            <form className="mt-4 flex">
              <input type="email" placeholder="Your Email" className="w-full rounded-l-lg p-2 text-gray-800" />
              <button type="submit" className="bg-brand-turquoise text-brand-navy p-2 rounded-r-lg font-bold">Go</button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Orbit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
