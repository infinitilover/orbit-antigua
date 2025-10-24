
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import PageWrapper from '@/components/PageWrapper';
import { useToast } from '@/context/ToastContext';
import { Mail } from 'lucide-react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { showToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !email || !message) {
            showToast('error', 'Incomplete Form', 'Please fill out all fields.');
            return;
        }
        // Simulate sending message
        console.log({ name, email, message });
        showToast('success', 'Message Sent!', 'Thank you for contacting us. We will get back to you shortly.');
        setName('');
        setEmail('');
        setMessage('');
    };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      {/* FIX: PageWrapper requires a 'children' prop. The page content has been nested inside it. */}
      <PageWrapper>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
            <GlassCard className="w-full max-w-2xl">
                <div className="text-center">
                    <Mail className="mx-auto h-12 w-12 text-brand-turquoise" />
                    <h1 className="mt-4 text-3xl font-extrabold text-brand-navy">Contact Us</h1>
                    <p className="mt-2 text-gray-600">Have a question or feedback? Drop us a line!</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-navy">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-brand-navy">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 rounded-xl border-gray-300 shadow-sm focus:border-brand-turquoise focus:ring focus:ring-brand-turquoise focus:ring-opacity-50"
                            placeholder="Your message..."
                        />
                    </div>
                    <div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </div>
                </form>
            </GlassCard>
        </div>
      </PageWrapper>
      <Footer />
    </div>
  );
}