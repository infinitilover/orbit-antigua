'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { LogIn } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      showToast('error', 'Missing Fields', 'Please enter both email and password.');
      return;
    }
    // Simulate login
    const user = {
        fullName: 'John Doe',
        email: email,
    };
    login(user);
    showToast('success', 'Login Successful', `Welcome back, ${user.fullName.split(' ')[0]}!`);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col">
       <Image
        src="https://picsum.photos/seed/antigua/1920/1080"
        alt="Antigua background"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-brand-navy bg-opacity-20 -z-10"></div>
      <Navbar />
      {/* FIX: PageWrapper requires a 'children' prop. The page content has been nested inside it. */}
      <PageWrapper className="flex items-center justify-center p-4 !pt-0">
        <GlassCard className="w-full max-w-md">
            <div className="text-center">
                <LogIn className="mx-auto h-12 w-12 text-brand-turquoise" />
                <h1 className="mt-4 text-3xl font-extrabold text-brand-navy">Welcome Back</h1>
                <p className="mt-2 text-gray-600">Log in to access your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-navy">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-4 py-3 rounded-xl border-gray-300 shadow-sm focus:border-brand-turquoise focus:ring focus:ring-brand-turquoise focus:ring-opacity-50"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-brand-navy">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-4 py-3 rounded-xl border-gray-300 shadow-sm focus:border-brand-turquoise focus:ring focus:ring-brand-turquoise focus:ring-opacity-50"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </div>
            </form>
             <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-brand-turquoise hover:underline">
                    Sign up
                </Link>
            </p>
        </GlassCard>
      </PageWrapper>
    </div>
  );
}