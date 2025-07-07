'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillType } from '@/types/api-data/skill';

interface SkillsStatsProps {
    skills: SkillType[] | [];
}

export default function SkillsStats({ skills }: SkillsStatsProps) {
    const groupedSkills = skills?.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        },
        {} as Record<string, SkillType[]>,
    );
    return (
        <div>
            {skills.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Skills Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {skills.length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Total Skills
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Object.keys(groupedSkills).length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Categories
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Math.max(
                                        ...Object.values(groupedSkills).map(
                                            (skills) => skills.length,
                                        ),
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Largest Category
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Object.entries(groupedSkills).find(
                                        ([, skills]) =>
                                            skills.length ===
                                            Math.max(
                                                ...Object.values(
                                                    groupedSkills,
                                                ).map((s) => s.length),
                                            ),
                                    )?.[0] || 'N/A'}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Top Category
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
