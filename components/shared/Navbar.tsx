
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick} className={`text-brand-navy font-medium transition-colors hover:text-brand-turquoise ${isActive ? 'text-brand-turquoise' : ''}`}>
      {children}
    </Link>
  );
};


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    showToast('success', 'Logged Out', 'You have been successfully logged out.');
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.svg" alt="Orbit Logo" width={120} height={40} />
          </Link>
          {/* FIX: The NavLink component requires a 'children' prop. Text has been added to each component instance. */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/listings">Listings</NavLink>
            <NavLink href="/#categories">Categories</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2 font-medium text-brand-navy p-2 rounded-lg hover:bg-gray-200/50 transition">
                  <User />
                  <span>{user?.fullName.split(' ')[0]}</span>
                  <ChevronDown size={16} className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200/50 z-50 overflow-hidden"
                  >
                    <Link href="/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-brand-navy hover:bg-gray-100 transition-colors w-full">
                      <User size={16} />
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-sm text-brand-navy hover:bg-gray-100 transition-colors w-full text-left">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                    <Button variant="secondary">Login</Button>
                </Link>
                <Link href="/signup">
                    <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-navy">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg pb-4">
          <div className="flex flex-col items-center space-y-4 pt-4">
            {/* FIX: The NavLink component requires a 'children' prop. Text has been added to each component instance. */}
            <NavLink href="/listings" onClick={() => setIsMenuOpen(false)}>Listings</NavLink>
            <NavLink href="/#categories" onClick={() => setIsMenuOpen(false)}>Categories</NavLink>
            <NavLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
             <div className="border-t border-gray-300 w-full my-2"></div>
            {isAuthenticated ? (
                <>
                 <NavLink href="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</NavLink>
                 <button onClick={() => { handleLogout(); setIsMenuOpen(false);}} className="font-medium text-brand-navy">Logout</button>
                </>
            ) : (
                <div className="flex items-center space-x-4">
                   <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="secondary">Login</Button>
                   </Link>
                   <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button>Sign Up</Button>
                   </Link>
                </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;