'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfileStore } from '@/store/api-data/profile-store';

export default function ProfileProject() {
    const { profile } = useProfileStore();
    return (
        <div>
            <Card className="mt-6">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Projects</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="mt-2">
                            {Array.isArray(profile?.projects) &&
                            profile.projects.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {profile.projects.map((project) => (
                                        <span
                                            key={project.id}
                                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                                        >
                                            {project?.name || 'Unknown Project'}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No projects added yet.
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
