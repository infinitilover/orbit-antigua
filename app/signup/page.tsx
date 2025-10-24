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
import { UserPlus } from 'lucide-react';
import Image from 'next/image';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      showToast('error', 'Missing Fields', 'Please fill out all fields.');
      return;
    }
    // Simulate signup and login
    const user = { fullName, email };
    login(user);
    showToast('success', 'Account Created!', `Welcome to Orbit, ${user.fullName.split(' ')[0]}!`);
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
                <UserPlus className="mx-auto h-12 w-12 text-brand-turquoise" />
                <h1 className="mt-4 text-3xl font-extrabold text-brand-navy">Create an Account</h1>
                <p className="mt-2 text-gray-600">Join Orbit to save your favorite businesses.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-brand-navy">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full px-4 py-3 rounded-xl border-gray-300 shadow-sm focus:border-brand-turquoise focus:ring focus:ring-brand-turquoise focus:ring-opacity-50"
                        placeholder="John Doe"
                    />
                </div>
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
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-4 py-3 rounded-xl border-gray-300 shadow-sm focus:border-brand-turquoise focus:ring focus:ring-brand-turquoise focus:ring-opacity-50"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </div>
            </form>
             <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-brand-turquoise hover:underline">
                    Log in
                </Link>
            </p>
        </GlassCard>
      </PageWrapper>
    </div>
  );
}