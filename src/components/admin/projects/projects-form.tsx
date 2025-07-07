'use client';

import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import {
    createProjectAsync,
    deleteProjectAsync,
    updateProjectAsync,
} from '@/app/actions/project-actions';
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
import { Textarea } from '@/components/ui/textarea';
import { uploadImageToCloudinary } from '@/lib/general-helper';
import { projectSchema } from '@/schema/project-schema';
import { useProfileStore } from '@/store/api-data/profile-store';
import { useProjectStore } from '@/store/api-data/project-store';
import { ProjectType } from '@/types/api-data/project';
import { ActionMode, FileState } from '@/types/general';

interface ProjectsFormProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    mode: ActionMode | undefined;
    values: ProjectType | null;
}
export default function ProjectsForm({
    open,
    onOpenChange,
    mode,
    values,
}: ProjectsFormProps) {
    const { profile } = useProfileStore();
    const {
        addProject,
        updateProject,
        deleteProject,
        selectedProject,
        resetSelectedProject,
    } = useProjectStore();

    const [imageValue, setImageValue] = useState<FileState | null>({
        image: null,
        preview: null,
    });

    const {
        register,
        watch,
        setValue,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            id: 0,
            name: '',
            description: '',
            image: '',
            url: '',
            repoLink: '',
            profileId: 0,
        },
    });
    // Watch form values
    const watchedValues = watch();

    // Update form when values change (for edit mode)
    useEffect(() => {
        if (values && mode === 'edit') {
            reset({
                id: values.id,
                name: values.name,
                description: values.description,
                image: values.image,
                url: values.url,
                repoLink: values.repoLink,
                profileId: values.profileId,
            });
        } else {
            reset({
                id: 0,
                name: '',
                description: '',
                image: '',
                url: '',
                repoLink: '',
                profileId: 0,
            });
        }
    }, [values, mode, reset]);

    // Reset image when dialog closes or mode changes
    useEffect(() => {
        if (!open) {
            setImageValue({
                image: null,
                preview: null,
            });
        }
    }, [open]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const sizeInBytes = file.size;
            const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to MB

            if (sizeInMB > 1) {
                toast.error(
                    `File size: ${sizeInMB.toFixed(2)} MB. File size must not exceed 1MB`,
                );

                return;
            }

            setImageValue({
                image: file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const handleCloseDialog = () => {
        onOpenChange?.(false);
        resetSelectedProject();
        setImageValue({
            image: null,
            preview: null,
        });
    };

    const handleDialogChange = (open: boolean) => {
        if (!open) {
            handleCloseDialog();
        } else {
            onOpenChange?.(true);
        }
    };

    const onSubmit = async (data: z.infer<typeof projectSchema>) => {
        try {
            if (imageValue?.image) {
                const imageUrl = await uploadImageToCloudinary(
                    imageValue.image,
                );

                if (imageUrl) data.image = imageUrl.secure_url;
            }

            if (mode === 'add') {
                const response = await createProjectAsync(data);
                if (response.success) {
                    addProject(response.data);
                    handleCloseDialog();
                }
            } else if (mode === 'edit') {
                const response = await updateProjectAsync(data.id, data);
                if (response.success) {
                    updateProject(response.data);
                    handleCloseDialog();
                }
            }
        } catch (error) {
            console.error('Failed to process project:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteProjectAsync(
                selectedProject?.id as number,
            );
            if (response.success) deleteProject(response.data.id);
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    // Get current icon to display (either new upload or existing)
    const currentImage = imageValue?.preview || watchedValues.image;

    return (
        <div>
            {mode === 'delete' ? (
                <AlertDialog open={open} onOpenChange={onOpenChange}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete "
                                {selectedProject?.name}
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
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {mode === 'edit'
                                    ? 'Edit Project'
                                    : 'Add New Project'}
                            </DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <Label htmlFor="name">Project Name</Label>
                                    <Input
                                        id="name"
                                        {...register('name')}
                                        placeholder="e.g., E-Commerce Platform"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        {...register('description')}
                                        placeholder="Describe your project, technologies used, and key features..."
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="image">Project Image</Label>
                                    {imageValue?.preview && (
                                        <div className="relative h-20 rounded-md w-20 border">
                                            <Image
                                                src={
                                                    imageValue?.preview ||
                                                    currentImage ||
                                                    '/projects/Website.webp'
                                                }
                                                fill
                                                objectFit="cover"
                                                objectPosition="center"
                                                alt="image"
                                                className="rounded-md"
                                            />
                                        </div>
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.image.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="url">Live Demo URL</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        {...register('url')}
                                        placeholder="https://your-project.vercel.app"
                                    />
                                    {errors.url && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.url.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="repoLink">
                                        Repository URL
                                    </Label>
                                    <Input
                                        id="repoLink"
                                        type="url"
                                        {...register('url')}
                                        placeholder="https://github.com/username/project"
                                    />
                                    {errors.repoLink && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.repoLink.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="profileId">
                                        Profile ID
                                    </Label>
                                    <Select
                                        value={String(watchedValues.profileId)}
                                        onValueChange={(value) => {
                                            setValue(
                                                'profileId',
                                                Number(value),
                                            );
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a profile" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value={
                                                    profile?.id
                                                        ? String(profile.id)
                                                        : ''
                                                }
                                            >
                                                {profile?.firstName}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
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
                                            ? 'Updating Project...'
                                            : 'Adding Project...'}
                                    </Button>
                                ) : (
                                    <Button type="submit">
                                        {mode === 'edit'
                                            ? 'Update Project'
                                            : 'Add Project'}
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
