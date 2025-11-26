import { PerfumeCard } from '../components/perfume-card';
import usePerfumes from '../queries/perfumes/perfumes';

export function Home() {
    const { data: perfumes } = usePerfumes();

    return (
        <div className="min-h-screen bg-white">
            {/* Minimal Hero Section */}
            <section className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
                            Discover Your
                            <br />
                            Signature Scent
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                            Curated collection of niche fragrances
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm uppercase tracking-wider text-gray-500 font-light">
                            {perfumes?.length} Products
                        </p>
                        <select className="text-sm uppercase tracking-wider text-gray-600 font-light border-none focus:ring-0 cursor-pointer bg-transparent">
                            <option value="">All Scents</option>
                            <option value="floral">Floral</option>
                            <option value="woody">Woody</option>
                            <option value="oriental">Oriental</option>
                            <option value="fresh">Fresh</option>
                            <option value="gourmand">Gourmand</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
                    {perfumes && perfumes?.map((perfume) => (
                        <PerfumeCard key={perfume.id} perfume={perfume} />
                    ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="border-t border-gray-100 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                        Stay Updated
                    </h2>
                    <p className="text-lg text-gray-600 font-light mb-8">
                        Subscribe to our newsletter for new arrivals and exclusive offers
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 px-6 py-3 border border-gray-300 text-sm font-light focus:outline-none focus:border-gray-900 transition-colors"
                        />
                        <button className="px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider font-light hover:bg-gray-800 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
