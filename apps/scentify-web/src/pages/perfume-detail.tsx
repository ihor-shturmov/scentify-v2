import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import usePerfumeDetail from '../queries/perfumes/perfume-detail';

export function PerfumeDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: perfume } = usePerfumeDetail(id || '');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!perfume) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Product Not Found</h2>
                    <Link to="/" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const hasImages = perfume.images && perfume.images.length > 0;
    const currentImage = hasImages ? perfume.images[selectedImageIndex] : null;

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <nav className="flex items-center space-x-2 text-sm font-light">
                        <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link to="/fragrances" className="text-gray-500 hover:text-gray-900">Fragrances</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900">{perfume.name}</span>
                    </nav>
                </div>
            </div>

            {/* Product Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                            {currentImage ? (
                                <img
                                    src={currentImage}
                                    alt={perfume.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-64 h-64 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Navigation */}
                        {hasImages && perfume.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {perfume.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square bg-gray-50 overflow-hidden border-2 transition-colors ${selectedImageIndex === index
                                                ? 'border-gray-900'
                                                : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${perfume.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col space-y-8">
                        {/* Header */}
                        <div className="space-y-4">
                            <p className="text-sm uppercase tracking-wider text-gray-500 font-light">{perfume.brand}</p>
                            <h1 className="text-3xl md:text-4xl font-light text-gray-900">
                                {perfume.name}
                            </h1>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(perfume.rating) ? 'text-gray-900' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500 font-light">
                                    ({perfume.reviewCount} reviews)
                                </span>
                            </div>
                            {/* Price - commented out for Fragrantica-style focus */}
                            {/* <p className="text-2xl font-light text-gray-900">${perfume.price}</p> */}
                        </div>

                        {/* Description */}
                        <div className="space-y-4 border-t border-gray-100 pt-8">
                            <p className="text-base text-gray-600 font-light leading-relaxed">
                                {perfume.description}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="space-y-6 border-t border-gray-100 pt-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 font-light mb-1">Scent Family</p>
                                    <p className="text-sm text-gray-900 font-light capitalize">{perfume.scentFamily}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500 font-light mb-1">Type</p>
                                    <p className="text-sm text-gray-900 font-light capitalize">{perfume.type.replace(/_/g, ' ')}</p>
                                </div>
                            </div>

                            {/* Fragrance Notes */}
                            <div className="space-y-4">
                                <p className="text-xs uppercase tracking-wider text-gray-500 font-light">Fragrance Notes</p>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 font-light mb-2">Top Notes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {perfume.fragranceNotes.top.map((note, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-light">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 font-light mb-2">Middle Notes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {perfume.fragranceNotes.middle.map((note, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-light">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 font-light mb-2">Base Notes</p>
                                        <div className="flex flex-wrap gap-2">
                                            {perfume.fragranceNotes.base.map((note, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-light">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Size Selection & Purchase - commented out for Fragrantica-style focus
            <div className="space-y-4 border-t border-gray-100 pt-8">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-light">Select Size</p>
              <div className="grid grid-cols-2 gap-3">
                {perfume.sizes.map((size, index) => (
                  <button
                    key={index}
                    className="border border-gray-300 hover:border-gray-900 p-4 transition-colors text-left"
                  >
                    <p className="text-sm font-light text-gray-900">{size.volume}ml</p>
                    <p className="text-sm text-gray-600 font-light">${size.price}</p>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-4 text-sm uppercase tracking-wider font-light hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
            */}
                    </div>
                </div>
            </div>
        </div>
    );
}
