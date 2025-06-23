'use client';

import { ComponentProps, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginAsync } from '@/app/actions/auth-actions';
import { setAuthCookies } from '@/app/actions/cookie-actions';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ADMIN_ROUTE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { loginSchema } from '@/schema/auth-schema';

interface AuthFormProps extends ComponentProps<'div'> {
    mode: 'login' | 'register';
}

export function AuthForm({ mode, className, ...props }: AuthFormProps) {
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const handleLogin = (values: z.infer<typeof loginSchema>) => {
        startTransition(async () => {
            try {
                const response = await loginAsync(values);
                if (response.success) {
                    const id = response.data.user.id;
                    const token = response.data.token;
                    const refreshToken = response.data.refreshToken;

                    await setAuthCookies(id, token, refreshToken);

                    router.push(ADMIN_ROUTE);
                } else {
                    alert('Login failed');
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        });
    };
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {mode === 'login'
                            ? 'Login to your account'
                            : mode === 'register'
                              ? 'Register an account'
                              : ''}
                    </CardTitle>
                    <CardDescription>
                        {`Enter your credentials below to ${mode === 'login' ? 'login' : mode === 'register' ? 'register' : ''} `}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your username"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    {isPending ? (
                                        <Button
                                            disabled={isPending}
                                            type="submit"
                                            className="w-full"
                                        >
                                            {mode === 'login'
                                                ? ' Logging in...'
                                                : mode === 'register'
                                                  ? 'Registering...'
                                                  : ''}
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={isPending}
                                            type="submit"
                                            className="w-full"
                                        >
                                            {mode === 'login'
                                                ? ' Login'
                                                : mode === 'register'
                                                  ? 'Register'
                                                  : ''}
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                {`${mode === 'login' ? "Don't" : mode === 'register' ? 'Already' : ''} have an account?`}
                                <Link
                                    href={
                                        mode === 'login'
                                            ? '/register'
                                            : mode === 'register'
                                              ? '/login'
                                              : '#'
                                    }
                                    className="underline underline-offset-4"
                                >
                                    {mode === 'login'
                                        ? ' Register'
                                        : mode === 'register'
                                          ? ' Login'
                                          : ''}
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
