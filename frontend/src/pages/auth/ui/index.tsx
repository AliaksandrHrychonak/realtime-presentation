'use client';

import { useRouter } from 'next/navigation';

import { AuthByUsernameForm } from '@features/session';

import type { JSX } from 'react';

export const AuthPage = (): JSX.Element => {
    const router = useRouter();

    return (
        <main className='min-h-screen flex items-center justify-center bg-gray-50'>
            <section className='max-w-md w-full p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Welcome to Presentations</h2>
                <p className='text-gray-600 mb-6 text-center'>Enter any nickname to access presentations</p>
                <AuthByUsernameForm onComplete={() => router.push('/dashboard/presentation/list')} />
            </section>
        </main>
    );
};
