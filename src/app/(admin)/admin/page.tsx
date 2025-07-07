'use client';

import type { ReactNode } from 'react';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { deleteCookie } from '@/app/actions/cookie-actions';
import Profile from '@/components/admin/profile/profile';
import Projects from '@/components/admin/projects/projects';
import Skills from '@/components/admin/skills/skills';
import Socials from '@/components/admin/socials/socials';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    LOGIN_ROUTE,
    REFRESHTOKENKEYCOOKIENAME,
    TOKENKEYCOOKIENAME,
    USERIDCOOKIENAME,
} from '@/lib/constants';

type tabComponentsType = {
    value: string;
    title: string;
    component: ReactNode | null;
};

export default function AdminPage() {
    const tabComponents: tabComponentsType[] = [
        {
            value: 'profile',
            title: 'Profile',
            component: <Profile />,
        },
        {
            value: 'skills',
            title: 'Skills',
            component: <Skills />,
        },
        {
            value: 'projects',
            title: 'Projects',
            component: <Projects />,
        },
        {
            value: 'social',
            title: 'Socials',
            component: <Socials />,
        },
    ];

    const router = useRouter();

    const handleLogout = async () => {
        await deleteCookie([
            TOKENKEYCOOKIENAME,
            REFRESHTOKENKEYCOOKIENAME,
            USERIDCOOKIENAME,
        ]);

        router.push(LOGIN_ROUTE);
    };

    return (
        <div>
            <Card>
                <CardHeader className="sr-only">
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs
                        defaultValue="profile"
                        className="w-full flex h-[90vh]"
                        orientation="vertical"
                    >
                        <TabsList className="flex flex-col items-start justify-between min-w-[250px] h-full">
                            <div className="w-full flex flex-col gap-3">
                                {tabComponents.map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="w-full text-md flex justify-start"
                                    >
                                        {tab.title}
                                    </TabsTrigger>
                                ))}
                            </div>

                            <Button
                                variant={'destructive'}
                                className="w-full"
                                onClick={handleLogout}
                            >
                                <LogOut /> Log out
                            </Button>
                        </TabsList>

                        {tabComponents.map((tab) => (
                            <TabsContent
                                key={tab.value}
                                value={tab.value}
                                className="flex-1 overflow-y-auto"
                            >
                                {tab.component || (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-muted-foreground">
                                            {tab.title} section coming soon...
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
