'use client';

import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import PageWrapper from '@/components/PageWrapper';
import { TriangleAlert } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
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
      <PageWrapper className="flex items-center justify-center p-4 !pt-0">
        <GlassCard className="w-full max-w-md text-center">
            <TriangleAlert className="mx-auto h-16 w-16 text-brand-turquoise" />
            <h1 className="mt-6 text-4xl font-extrabold text-brand-navy">404 - Page Not Found</h1>
            <p className="mt-4 text-gray-600">
              Oops! The page you're looking for doesn't seem to exist. It might have been moved or deleted.
            </p>
            <div className="mt-8">
                <Link href="/">
                    <Button>
                        Go Back Home
                    </Button>
                </Link>
            </div>
        </GlassCard>
      </PageWrapper>
    </div>
  )
}