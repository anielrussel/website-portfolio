'use client';

import React, { ReactNode } from 'react';

import Profile from '@/components/admin/profile';
import {
    Card
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
            component: null,
        },
        {
            value: 'projects',
            title: 'Projects',
            component: null,
        },
        {
            value: 'social',
            title: 'Socials',
            component: null,
        },
    ];
    return (
        <div>
            <Card>
                <Tabs
                    defaultValue="profile"
                    className="w-[400px] flex gap-6 h-[90vh]"
                    orientation="vertical"
                >
                    <TabsList className="flex flex-col gap-3 justify-start min-w-[250px] h-full">
                        {tabComponents.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="w-full flex justify-start"
                            >
                                {tab.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabComponents.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            {tab.component}
                        </TabsContent>
                    ))}
                </Tabs>
            </Card>
        </div>
    );
}
