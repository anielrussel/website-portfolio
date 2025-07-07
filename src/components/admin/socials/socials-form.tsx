'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    Facebook,
    Github,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MessageCircle,
    Share2,
    Twitter,
    Youtube,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    createSocialLinkAsync,
    deleteSocialLinkAsync,
    updateSocialLinkAsync,
} from '@/app/actions/social-link-actions';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { socialLinkSchema } from '@/schema/social-link-schema';
import { useProfileStore } from '@/store/api-data/profile-store';
import { useSocialLinkStore } from '@/store/api-data/social-link-store';
import { SocialLinksType } from '@/types/api-data/social-links';
import { ActionMode } from '@/types/general';

const iconOptions = [
    { value: 'Github', label: 'GitHub', icon: Github, color: 'text-gray-700' },
    {
        value: 'Linkedin',
        label: 'LinkedIn',
        icon: Linkedin,
        color: 'text-blue-600',
    },
    {
        value: 'Twitter',
        label: 'Twitter/X',
        icon: Twitter,
        color: 'text-blue-400',
    },
    {
        value: 'Instagram',
        label: 'Instagram',
        icon: Instagram,
        color: 'text-pink-500',
    },
    {
        value: 'Facebook',
        label: 'Facebook',
        icon: Facebook,
        color: 'text-blue-700',
    },
    {
        value: 'Youtube',
        label: 'YouTube',
        icon: Youtube,
        color: 'text-red-600',
    },
    { value: 'Globe', label: 'Website', icon: Globe, color: 'text-green-600' },
    { value: 'Mail', label: 'Email', icon: Mail, color: 'text-orange-500' },
    {
        value: 'MessageCircle',
        label: 'Discord',
        icon: MessageCircle,
        color: 'text-indigo-500',
    },
    { value: 'Share2', label: 'Other', icon: Share2, color: 'text-gray-500' },
];

interface SocialsFormProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    mode: ActionMode | undefined;
    values: SocialLinksType | null;
    prefilledData?: Partial<SocialLinksType> | null;
}
export default function SocialsForm({
    open,
    onOpenChange,
    mode,
    values,
    prefilledData,
}: SocialsFormProps) {
    const { profile } = useProfileStore();
    const {
        addSocial,
        updateSocial,
        deleteSocial,
        selectedSocial,
        resetSelectedSocial,
    } = useSocialLinkStore();

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof socialLinkSchema>>({
        resolver: zodResolver(socialLinkSchema),
        defaultValues: {
            id: 0,
            name: '',
            url: '',
            icon: '',
            profileId: profile?.id || 0,
        },
    });

    // Watch form values
    const watchedValues = watch();

    // Update form when values change (for edit mode) or prefilledData changes
    useEffect(() => {
        if (values && mode === 'edit') {
            reset({
                id: values.id,
                name: values.name,
                url: values.url,
                icon: values.icon,
                profileId: values.profileId,
            });
        } else if (prefilledData && mode === 'add') {
            reset({
                id: prefilledData.id || 0,
                name: prefilledData.name || '',
                url: prefilledData.url || '',
                icon: prefilledData.icon || '',
                profileId: prefilledData.profileId || profile?.id || 0,
            });
        } else if (mode === 'add') {
            reset({
                id: 0,
                name: '',
                url: '',
                icon: '',
                profileId: profile?.id || 0,
            });
        }
    }, [values, mode, prefilledData, profile?.id, reset]);

    const handleCloseDialog = () => {
        onOpenChange?.(false);
        resetSelectedSocial();
    };

    const handleDialogChange = (open: boolean) => {
        if (!open) {
            handleCloseDialog();
        } else {
            onOpenChange?.(true);
        }
    };

    const onSubmit = async (data: z.infer<typeof socialLinkSchema>) => {
        try {
            if (mode === 'add') {
                const response = await createSocialLinkAsync(data);
                if (response.success) {
                    addSocial(response.data);
                    handleCloseDialog();
                }
            } else if (mode === 'edit') {
                const response = await updateSocialLinkAsync(data.id, data);
                if (response.success) {
                    updateSocial(response.data);
                    handleCloseDialog();
                }
            }
        } catch (error) {
            console.error('Failed to process socials:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteSocialLinkAsync(
                selectedSocial?.id as number,
            );
            if (response.success) deleteSocial(response.data.id);
        } catch (error) {
            console.error('Failed to delete social:', error);
        }
    };

    return (
        <div>
            {mode === 'delete' ? (
                <AlertDialog open={open} onOpenChange={onOpenChange}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete Social Link
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete "
                                {selectedSocial?.name}
                                "? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
                <Dialog open={open} onOpenChange={handleDialogChange}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {mode === 'edit'
                                    ? 'Edit Social Link'
                                    : 'Add New Social Link'}
                            </DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Platform Name</Label>
                                <Input
                                    id="name"
                                    {...register('name')}
                                    placeholder="e.g., GitHub, LinkedIn, Personal Website"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="url">URL *</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    {...register('url')}
                                    placeholder="https://github.com/username"
                                />
                                {errors.url && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.url.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="icon">Icon *</Label>
                                <Select
                                    value={watchedValues.icon as string}
                                    onValueChange={(value) => {
                                        setValue('icon', value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {iconOptions.map((option) => {
                                            const IconComponent = option.icon;
                                            return (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <IconComponent
                                                            className={`w-4 h-4 ${option.color}`}
                                                        />
                                                        {option.label}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                {errors.icon && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.icon.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="profileId">Profile ID *</Label>
                                <Select
                                    value={String(watchedValues.profileId)}
                                    onValueChange={(value) => {
                                        setValue('profileId', Number(value));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a profile" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value={
                                                profile?.id?.toString() ?? ''
                                            }
                                        >
                                            {profile?.firstName}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.icon && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.icon.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseDialog}
                                >
                                    Cancel
                                </Button>
                                {isSubmitting ? (
                                    <Button type="submit">
                                        {mode === 'edit'
                                            ? 'Updating Social...'
                                            : 'Adding Social...'}
                                    </Button>
                                ) : (
                                    <Button type="submit">
                                        {mode === 'edit'
                                            ? 'Update Social'
                                            : 'Add Social'}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
