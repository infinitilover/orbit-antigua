
'use client';

import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import GlassCard from '@/components/ui/GlassCard';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { mockBusinesses } from '@/lib/data';
import BusinessCard from '@/components/BusinessCard';
import { User, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

function ProfileContent() {
    const { user, favorites } = useAuth();
    const favoritedBusinesses = mockBusinesses.filter(b => favorites.includes(b.id));

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

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            
            {/* FIX: PageWrapper requires a 'children' prop. The page content has been nested inside it. */}
            <PageWrapper>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <GlassCard className="mb-8">
                        <div className="flex items-center">
                            <div className="bg-brand-turquoise text-brand-navy rounded-full p-4 mr-4">
                                <User size={40} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">
                                    {user?.fullName}
                                </h1>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <div className="flex items-center mb-6">
                            <Heart className="text-red-500 mr-3" />
                            <h2 className="text-2xl font-bold text-brand-navy">My Favorites</h2>
                        </div>
                        {favoritedBusinesses.length > 0 ? (
                             <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {favoritedBusinesses.map(business => (
                                    <motion.div key={business.id} variants={itemVariants} className="h-full">
                                        <BusinessCard business={business} />
                                    </motion.div>
                                ))}
                             </motion.div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600">You haven't favorited any businesses yet.</p>
                                <p className="text-gray-500 text-sm mt-2">Click the heart icon on any listing to save it here!</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </PageWrapper>

            <Footer />
        </div>
    );
}

export default function ProfilePage() {
    return (
        // FIX: ProtectedRoute requires a 'children' prop. The ProfileContent component has been nested inside it.
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}