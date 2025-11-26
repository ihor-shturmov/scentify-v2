import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '../types/login';
import useLogin from '../queries/auth/login';

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const { mutateAsync } = useLogin();

    const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
        mutateAsync(data);
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
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
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600 font-light">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-gray-600 font-light">Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="text-gray-600 hover:text-gray-900 font-light">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 text-sm uppercase tracking-wider font-light hover:bg-gray-800 transition-colors"
                    >
                        Sign In
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

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className="text-gray-600 font-light">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-gray-900 hover:text-gray-600 font-normal">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
