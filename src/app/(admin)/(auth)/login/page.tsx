'use client';

import React from 'react';

import { AuthForm } from '@/components/auth/auth-form';

export default function LoginPage() {
    return (
        <div className="flex min-h-[90vh] w-full items-center justify-center">
            <div className="w-full max-w-sm">
                <AuthForm mode="login" />
            </div>
        </div>
    );
}
