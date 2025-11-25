import { Link } from 'react-router-dom';
import { Perfume } from '@scentify/shared-types';

interface PerfumeCardProps {
    perfume: Perfume;
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
    return (
        <Link
            to={`/fragrances/${perfume.id}`}
            className="group block"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-32 h-32 text-gray-200 group-hover:text-gray-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-light">
                    {perfume.brand}
                </p>
                <h3 className="text-base font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                    {perfume.name}
                </h3>
                {/* Price - commented out for Fragrantica-style focus on fragrance info
        <p className="text-sm text-gray-900 font-light">
          ${perfume.price}
        </p>
        */}
            </div>
        </Link>
    );
}
