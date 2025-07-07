'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Code, Edit, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { getSkillsAsync } from '@/app/actions/skill-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSkillStore } from '@/store/api-data/skill-store';
import { SkillType } from '@/types/api-data/skill';
import { ActionMode } from '@/types/general';

import SkillsForm from './skills-form';
import SkillsStats from './skills-stats';

export default function Skills() {
    const {
        skills,
        loadSkills,
        selectSkill,
        selectedSkill,
        resetSelectedSkill,
    } = useSkillStore();
    const [mode, setMode] = useState<ActionMode | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleOpenDialog = (skill?: SkillType) => {
        if (skill) {
            setMode('edit');
            selectSkill(skill);
        } else {
            setMode('add');
            resetSelectedSkill();
        }
        setIsDialogOpen(true);
    };

    const handleOpenDeleteDialog = (skill: SkillType) => {
        setMode('delete');
        selectSkill(skill);
        setIsDialogOpen(true);
    };

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

    const fetchSkills = async () => {
        try {
            const response = await getSkillsAsync();
            if (response.success) {
                loadSkills(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch skills:', error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto py-2 px-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Skills Management</h2>
                    <p className="text-muted-foreground">
                        Manage your technical skills and expertise
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog()}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                </Button>
            </div>

            {/* Add and Update Form */}
            <SkillsForm
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode={mode}
                values={selectedSkill}
            />

            {/* Skills Display */}
            {Object.keys(groupedSkills).length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Code className="w-12 h-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No skills added yet
                        </h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Start building your skills portfolio by adding your
                            first skill
                        </p>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Skill
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedSkills).map(
                        ([category, categorySkills]) => (
                            <Card key={category}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        {category}
                                        <Badge
                                            variant="secondary"
                                            className="h-5 min-w-5 rounded-full p-1 font-mono tabular-nums bg-green-700"
                                        >
                                            {categorySkills.length}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categorySkills.map((skill) => {
                                            return (
                                                <div
                                                    key={skill.id}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary/10 rounded-md">
                                                            <Image
                                                                src={
                                                                    skill.icon ||
                                                                    '/skills/react.svg'
                                                                }
                                                                width={20}
                                                                height={20}
                                                                alt="icon"
                                                                className="w-5 h-5 text-primary"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium">
                                                                {skill.name}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {skill.category}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleOpenDialog(
                                                                    skill,
                                                                )
                                                            }
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleOpenDeleteDialog(
                                                                    skill,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ),
                    )}
                </div>
            )}

            {/* Summary Stats */}
            <SkillsStats skills={skills} />
        </div>
    );
}
