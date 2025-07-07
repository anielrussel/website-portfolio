'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createProfileSkillAsync } from '@/app/actions/profile-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { profileSkillSchema } from '@/schema/profile-skill-schema';
import { useProfileStore } from '@/store/api-data/profile-store';
import { useSkillStore } from '@/store/api-data/skill-store';

export default function ProfileSkill() {
    const { profile, updateProfileSkills } = useProfileStore();
    const { skills } = useSkillStore();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const skillOptions = useMemo(() => {
        return skills.map((s) => ({
            label: s.name,
            value: s.id.toString(),
        }));
    }, [skills]);

    const profileSkillValues = useMemo(() => {
        if (!profile?.skills || !skills) return [];

        return profile.skills.map((profileSkill) => {
            const skill = skills.find((s) => s.id === profileSkill.skillId);
            return {
                label: skill?.name || 'Unknown Skill',
                value: profileSkill.skillId.toString(),
            };
        });
    }, [profile?.skills, skills]);

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<z.infer<typeof profileSkillSchema>>({
        resolver: zodResolver(profileSkillSchema),
        defaultValues: {
            profileId: profile?.id || 0,
            addedSkillIds: [],
            deletedSkillIds: [],
        },
    });

    // Watch form values to track changes
    const watchedSkills = watch('addedSkillIds');

    // Reset form when profile changes or when canceling edit
    useEffect(() => {
        if (profile) {
            reset({
                profileId: profile.id,
                addedSkillIds: [],
                deletedSkillIds: [],
            });
        }
    }, [profile, reset]);

    const handleToggleEdit = () => {
        if (isEditing) {
            // Reset form when canceling edit
            reset({
                profileId: profile?.id || 0,
                addedSkillIds: [],
                deletedSkillIds: [],
            });
        }
        setIsEditing((prev) => !prev);
    };

    const onSubmit = async (data: z.infer<typeof profileSkillSchema>) => {
        try {
            const response = await createProfileSkillAsync(data);
            if (response.success) {
                updateProfileSkills(data.addedSkillIds, data.deletedSkillIds);

                if (
                    data.addedSkillIds.length > 0 &&
                    data.deletedSkillIds.length > 0
                )
                    toast.success('Updated profile skill');
                if (data.addedSkillIds.length > 0)
                    toast.success('Added skill to profile');
                if (data.deletedSkillIds.length > 0)
                    toast.success('Removed skill from profile');
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to process profile skills:', error);
            toast.error('Failed to update profile skill');
        }
    };

    const handleSkillChange = (selectedOptions: Option[]) => {
        const originalSkillIds =
            profile?.skills?.map((profileSkill) =>
                profileSkill.skillId.toString(),
            ) || [];
        const newSkillIds = selectedOptions.map((option) => option.value);

        // Calculate added and deleted skills
        const addedSkillIds = newSkillIds.filter(
            (id) => !originalSkillIds.includes(id),
        );
        const deletedSkillIds = originalSkillIds.filter(
            (id) => !newSkillIds.includes(id),
        );

        // Convert string IDs to numbers before updating form values
        setValue('addedSkillIds', addedSkillIds.map(Number));
        setValue('deletedSkillIds', deletedSkillIds.map(Number));
    };

    // Get current selected skills (original + added - deleted)
    const getCurrentSelectedSkills = () => {
        const originalSkills = profileSkillValues;
        const addedSkillIds = watchedSkills || [];
        const deletedSkillIds = watch('deletedSkillIds') || [];

        // Start with original skills
        let currentSkills = [...originalSkills];

        // Remove deleted skills
        currentSkills = currentSkills.filter(
            (skill) => !deletedSkillIds.includes(Number(skill.value)),
        );

        // Add new skills
        const newSkills = skillOptions.filter((option) =>
            addedSkillIds.includes(Number(option.value)),
        );
        currentSkills = [...currentSkills, ...newSkills];

        return currentSkills;
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="mt-6">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Skills</CardTitle>
                            <div>
                                {isEditing ? (
                                    <div className="space-x-2">
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            size="sm"
                                            disabled={isSubmitting}
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isSubmitting
                                                ? 'Saving...'
                                                : 'Save'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleToggleEdit}
                                            disabled={isSubmitting}
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleToggleEdit}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Skills
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Skills
                            </Label>
                            {isEditing ? (
                                <div>
                                    <MultipleSelector
                                        defaultOptions={skillOptions}
                                        value={getCurrentSelectedSkills()}
                                        onChange={handleSkillChange}
                                        placeholder="Select skills you have..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                No results found.
                                            </p>
                                        }
                                        className="max-w-full"
                                    />
                                    {errors.addedSkillIds && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.addedSkillIds.message}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-2">
                                    {Array.isArray(profile?.skills) &&
                                    profile.skills.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {profile.skills.map(
                                                (
                                                    profileSkill: any,
                                                    idx: number,
                                                ) => {
                                                    const skill = skills.find(
                                                        (s) =>
                                                            s.id ===
                                                            profileSkill.skillId,
                                                    );
                                                    return (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                                                        >
                                                            {skill?.name ||
                                                                'Unknown Skill'}
                                                        </span>
                                                    );
                                                },
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No skills added yet.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
