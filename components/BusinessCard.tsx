import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';
import { Business } from '@/types';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const BusinessCard = ({ business }: { business: Business }) => {
    const { isAuthenticated, toggleFavorite, isFavorited } = useAuth();
    const { showToast } = useToast();
    const favorited = isFavorited(business.id);

    {/* Fix: Specified the event target type for React.MouseEvent to resolve generic type error. */}
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
        <div className="h-full relative group">
            <button
                onClick={handleFavoriteClick}
                className="absolute top-3 right-3 z-10 p-2 bg-white/70 backdrop-blur-sm rounded-full transition-colors duration-300 hover:bg-white"
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart size={20} className={`transition-all ${favorited ? 'text-red-500 fill-current' : 'text-brand-navy'}`} />
            </button>
            <Link href={`/listings/${business.id}`} className="h-full block">
                <GlassCard className="overflow-hidden h-full flex flex-col !p-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                    src={business.imageUrl} 
                    alt={business.name} 
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 23vw"
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <p className="text-sm font-medium text-brand-turquoise">{business.category}</p>
                    <h3 className="text-lg font-bold text-brand-navy mt-1 truncate">{business.name}</h3>
                    <p className="text-gray-600 mt-2 text-sm flex-grow">{business.description}</p>
                    <div className="mt-4 text-right font-bold text-brand-navy group-hover:text-brand-turquoise transition-colors">
                    View Details &rarr;
                    </div>
                </div>
                </GlassCard>
            </Link>
        </div>
    );
}

export default BusinessCard;