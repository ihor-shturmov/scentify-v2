import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignUpSchemaType } from '../types/signup';
import useSignup from '../queries/signup';

export function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signupSchema),
    });

    const { mutateAsync } = useSignup();

    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
        mutateAsync(data);
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-light mb-8 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <Link to="/" className="inline-block mb-8">
                        <span className="text-2xl font-light tracking-wider text-gray-900">
                            SCENTIFY
                        </span>
                    </Link>
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600 font-light">Join the fragrance community</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-xs uppercase tracking-wider text-gray-500 font-light mb-2">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                {...register('firstName')}
                                className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${errors.firstName ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-gray-900'
                                    }`}
                                placeholder="John"
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-xs uppercase tracking-wider text-gray-500 font-light mb-2">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                {...register('lastName')}
                                className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${errors.lastName ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-gray-900'
                                    }`}
                                placeholder="Doe"
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 font-light mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-gray-900'
                                }`}
                            placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs uppercase tracking-wider text-gray-500 font-light mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${errors.password ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-gray-900'
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.password ? (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        ) : (
                            <p className="mt-1 text-xs text-gray-500 font-light">At least 8 characters</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs uppercase tracking-wider text-gray-500 font-light mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${errors.confirmPassword ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-gray-900'
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="flex items-start">
                        <input type="checkbox" required className="mt-1 mr-2" />
                        <label className="text-sm text-gray-600 font-light">
                            I agree to the{' '}
                            <Link to="/terms" className="text-gray-900 hover:text-gray-600">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-gray-900 hover:text-gray-600">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 text-sm uppercase tracking-wider font-light hover:bg-gray-800 transition-colors"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-light">or</span>
                    </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-gray-600 font-light">
                        Already have an account?{' '}
                        <Link to="/login" className="text-gray-900 hover:text-gray-600 font-normal">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
