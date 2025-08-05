'use client';

import { ReactNode } from 'react';

import Sidebar from '@/components/custom/sidebar';

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Sidebar>{children}</Sidebar>
        </div>
    );
}
