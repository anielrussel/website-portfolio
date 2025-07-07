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
    createSkillAsync,
    deleteSkillAsync,
    updateSkillAsync,
} from '@/app/actions/skill-actions';
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
import { uploadImageToCloudinary } from '@/lib/general-helper';
import { skillSchema } from '@/schema/skill-schema';
import { useSkillStore } from '@/store/api-data/skill-store';
import { SkillType } from '@/types/api-data/skill';
import { ActionMode, FileState } from '@/types/general';

const categoryOptions = ['Main', 'Frontend', 'Backend', 'Other'];

interface SkillsFormProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    mode: ActionMode | undefined;
    values: SkillType | null;
}

export default function SkillsForm({
    open,
    onOpenChange,
    mode,
    values,
}: SkillsFormProps) {
    const {
        addSkill,
        updateSkill,
        deleteSkill,
        selectedSkill,
        resetSelectedSkill,
    } = useSkillStore();

    const [iconValue, setIconValue] = useState<FileState | null>({
        image: null,
        preview: null,
    });

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof skillSchema>>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            id: 0,
            name: '',
            icon: '',
            category: '',
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
                icon: values.icon,
                category: values.category,
            });
        } else {
            reset({
                id: 0,
                name: '',
                icon: '',
                category: '',
            });
        }
    }, [values, mode, reset]);

    // Reset icon when dialog closes or mode changes
    useEffect(() => {
        if (!open) {
            setIconValue({
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

            setIconValue({
                image: file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const handleCloseDialog = () => {
        onOpenChange?.(false);
        resetSelectedSkill();
        setIconValue({
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

    const onSubmit = async (data: z.infer<typeof skillSchema>) => {
        try {
            if (iconValue?.image) {
                const iconUrl = await uploadImageToCloudinary(iconValue.image);

                if (iconUrl) data.icon = iconUrl.secure_url;
            }

            if (mode === 'add') {
                const response = await createSkillAsync(data);
                if (response.success) {
                    addSkill(response.data);
                    handleCloseDialog();
                }
            } else if (mode === 'edit') {
                const response = await updateSkillAsync(data.id, data);
                if (response.success) {
                    updateSkill(response.data);
                    handleCloseDialog();
                }
            }
        } catch (error) {
            console.error('Failed to process skill:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteSkillAsync(
                selectedSkill?.id as number,
            );
            if (response.success) deleteSkill(response.data.id);
        } catch (error) {
            console.error('Failed to delete skill:', error);
        }
    };

    // Get current icon to display (either new upload or existing)
    const currentIcon = iconValue?.preview || watchedValues.icon;

    return (
        <div>
            {mode === 'delete' ? (
                <AlertDialog open={open} onOpenChange={onOpenChange}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete "
                                {selectedSkill?.name}
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
                                    ? 'Edit Skill'
                                    : 'Add New Skill'}
                            </DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="name">Skill Name</Label>
                                <Input
                                    id="name"
                                    {...register('name')}
                                    placeholder="e.g., React, Python, Figma"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="icon">Icon</Label>
                                {currentIcon && (
                                    <div className="relative h-10 rounded-xl w-10 border mb-2">
                                        <Image
                                            src={currentIcon}
                                            fill
                                            objectFit="cover"
                                            objectPosition="center"
                                            alt="icon"
                                            className="rounded-md"
                                        />
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {errors.icon && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.icon.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={watchedValues.category}
                                    onValueChange={(value) => {
                                        setValue('category', value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryOptions.map(
                                            (category, index) => (
                                                <SelectItem
                                                    key={`${category}-${index}`}
                                                    value={category}
                                                >
                                                    {category}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.category.message}
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
                                            ? 'Updating Skill...'
                                            : 'Adding Skill...'}
                                    </Button>
                                ) : (
                                    <Button type="submit">
                                        {mode === 'edit'
                                            ? 'Update Skill'
                                            : 'Add Skill'}
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
