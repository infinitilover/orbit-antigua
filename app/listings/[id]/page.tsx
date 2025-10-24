
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { mockBusinesses } from '@/lib/data';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import PageWrapper from '@/components/PageWrapper';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { MapPin, Phone, Globe, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function BusinessDetailPage() {
  const params = useParams();
  const { id } = params;
  const business = mockBusinesses.find((b) => b.id === id);

  const { isAuthenticated, toggleFavorite, isFavorited } = useAuth();
  const { showToast } = useToast();

  if (!business) {
    notFound();
  }

  const favorited = isFavorited(business.id);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
        showToast('error', 'Please Log In', 'You must be logged in to favorite a business.');
        return;
    }
    toggleFavorite(business.id);
    showToast('success', favorited ? 'Removed from favorites' : 'Added to favorites!', business.name);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      {/* FIX: PageWrapper requires a 'children' prop. The page content has been nested inside it. */}
      <PageWrapper>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <GlassCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div>
                <div className="relative h-96 w-full overflow-hidden rounded-xl mb-4">
                    <Image
                        src={business.imageUrl}
                        alt={business.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 90vw, 45vw"
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 hover:scale-105"
                    />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {business.gallery.slice(0, 4).map((img, index) => (
                        <div key={index} className="relative h-24 w-full overflow-hidden rounded-md">
                            <Image
                                src={img}
                                alt={`${business.name} gallery image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 22vw, 11vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
              </div>

              {/* Business Details */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-brand-turquoise">{business.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mt-1">{business.name}</h1>
                <p className="text-gray-600 mt-4 text-base">{business.longDescription}</p>
                
                <div className="mt-6 space-y-3 text-brand-navy">
                    <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-brand-turquoise" />
                        <span>{business.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={18} className="text-brand-turquoise" />
                        <a href={`tel:${business.phone}`} className="hover:underline">{business.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe size={18} className="text-brand-turquoise" />
                        <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{business.website}</a>
                    </div>
                </div>

                <div className="mt-auto pt-6 flex gap-4">
                    <Button onClick={() => window.open(`https://${business.website}`, '_blank')}>Visit Website</Button>
                    <button
                        onClick={handleFavoriteClick}
                        className="p-3 bg-white/70 backdrop-blur-sm rounded-xl transition-colors duration-300 hover:bg-white border border-gray-200 flex items-center gap-2"
                        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart size={20} className={`transition-all ${favorited ? 'text-red-500 fill-current' : 'text-brand-navy'}`} />
                        <span className="font-semibold text-brand-navy">{favorited ? 'Favorited' : 'Favorite'}</span>
                    </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </PageWrapper>
      <Footer />
    </div>
  );
}