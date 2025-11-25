import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/auth.store';
import { User } from 'lucide-react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    return (
        <header className="bg-white border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <span className="text-2xl font-light tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors">
                            SCENTIFY
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-12">
                        <Link to="/" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors">
                            Home
                        </Link>
                        <Link to="/fragrances" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors">
                            Fragrances
                        </Link>
                        <span className="text-sm uppercase tracking-wider text-gray-300 cursor-not-allowed font-light">
                            Collections
                        </span>
                        <span className="text-sm uppercase tracking-wider text-gray-300 cursor-not-allowed font-light">
                            About
                        </span>

                        {/* Auth Section */}
                        {isAuthenticated ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span>{user?.firstName}</span>
                                </button>

                                {/* User Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-light text-gray-900">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-gray-500 font-light">{user?.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-light transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-6 space-y-4 border-t border-gray-100">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light"
                        >
                            Home
                        </Link>
                        <Link
                            to="/fragrances"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light"
                        >
                            Fragrances
                        </Link>
                        <div className="block text-sm uppercase tracking-wider text-gray-300 cursor-not-allowed font-light">
                            Collections
                        </div>
                        <div className="block text-sm uppercase tracking-wider text-gray-300 cursor-not-allowed font-light">
                            About
                        </div>

                        {/* Mobile Auth Section */}
                        {isAuthenticated ? (
                            <>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm font-light text-gray-900">{user?.firstName} {user?.lastName}</p>
                                    <p className="text-xs text-gray-500 font-light">{user?.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}
