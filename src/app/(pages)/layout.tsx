import Sidebar from '@/components/custom/sidebar';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Sidebar>{children}</Sidebar>
        </div>
    );
}
