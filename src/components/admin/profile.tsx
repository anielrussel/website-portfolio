'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Phone, Save, User, X } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
    getProfileByIdAsync,
    updateProfileAsync,
} from '@/app/actions/profile-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { uploadImageToCloudinary } from '@/lib/general-helper';
import { profileSchema } from '@/schema/profile-schema';
import { useProfileStore } from '@/store/api-data/profile-store';

type FileState = {
    image: File | null;
    preview: string | null;
};

export default function Profile() {
    const { profile, loadProfile, updateProfile } = useProfileStore();

    const [imageValue, setImageValue] = useState<FileState | null>({
        image: null,
        preview: null,
    });
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            id: 0,
            firstName: '',
            lastName: '',
            middleName: '',
            position: '',
            email: '',
            contactNo: '',
            address: '',
            userId: 0,
            image: '',
        },
    });

    const handleToggleEdit = () => {
        if (isEditing) {
            // Reset form when canceling edit
            reset();
            setImageValue({ image: null, preview: null });
        }
        setIsEditing((prev) => !prev);
    };

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

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        try {
            if (imageValue?.image) {
                const imageUrl = await uploadImageToCloudinary(
                    imageValue.image,
                );

                console.log(imageUrl);

                if (imageUrl) data.image = imageUrl.secure_url;
            }

            const response = await updateProfileAsync(data.id, data);
            if (response.success) {
                updateProfile(response.data);

                toast.success('Profile updated');
                setIsEditing(false);
            } else {
                toast.error('Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchProfileById = async () => {
        try {
            const response = await getProfileByIdAsync(1);
            if (response.success) {
                loadProfile(response.data);
                // Reset form with fetched data
                reset({
                    id: response.data.id || 0,
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    middleName: response.data.middleName || '',
                    position: response.data.position || '',
                    email: response.data.email || '',
                    contactNo: response.data.contactNo || '',
                    address: response.data.address || '',
                    image: response.data.image || '',
                    userId: response.data.userId || 0,
                });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        fetchProfileById();
    }, []);

    // Update form when profile changes
    useEffect(() => {
        if (profile) {
            reset({
                id: profile.id || 0,
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                middleName: profile.middleName || '',
                position: profile.position || '',
                email: profile.email || '',
                contactNo: profile.contactNo || '',
                address: profile.address || '',
                image: profile.image || '',
                userId: profile.userId || 0,
            });
        }
    }, [profile, reset]);

    return (
        <div className="w-full mx-auto py-2 px-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Profile Setup</h2>
                    <p className="text-muted-foreground">
                        Manage your profile information
                    </p>
                </div>
                {isEditing ? (
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
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
                        variant="outline"
                        size="sm"
                        onClick={handleToggleEdit}
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Main Profile Card */}
                <div className="flex items-end gap-2 mb-6">
                    <div className="relative h-36 rounded-xl w-44 border">
                        <Image
                            src={
                                imageValue?.preview ||
                                profile?.image ||
                                '/profile.webp'
                            }
                            fill
                            objectFit="cover"
                            objectPosition="center"
                            alt="profile"
                            className="rounded-lg"
                        />
                    </div>
                    {isEditing && (
                        <div className="max-w-xs">
                            <Input
                                type="file"
                                accept="image/*"
                                maxLength={1}
                                onChange={handleImageChange}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Detailed Information Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Personal Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">
                                        First Name
                                    </Label>
                                    {isEditing ? (
                                        <div>
                                            <Input
                                                type="text"
                                                {...register('firstName')}
                                            />
                                            {errors.firstName && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.firstName.message}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="font-medium">
                                            {profile?.firstName || 'n/a'}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">
                                        Last Name
                                    </Label>
                                    {isEditing ? (
                                        <div>
                                            <Input
                                                type="text"
                                                {...register('lastName')}
                                            />
                                            {errors.lastName && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {errors.lastName.message}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="font-medium">
                                            {profile?.lastName || 'n/a'}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Middle Name
                                </Label>
                                {isEditing ? (
                                    <div>
                                        <Input
                                            type="text"
                                            {...register('middleName')}
                                        />
                                        {errors.middleName && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.middleName.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium">
                                        {profile?.middleName || 'n/a'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Position
                                </Label>
                                {isEditing ? (
                                    <div>
                                        <Input
                                            type="text"
                                            {...register('position')}
                                        />
                                        {errors.position && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.position.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium">
                                        {profile?.position || 'n/a'}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Contact Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Primary Email
                                </Label>
                                {isEditing ? (
                                    <div>
                                        <Input
                                            type="email"
                                            {...register('email')}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium">
                                        {profile?.email || 'n/a'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Phone Number
                                </Label>
                                {isEditing ? (
                                    <div>
                                        <Input
                                            type="text"
                                            {...register('contactNo')}
                                        />
                                        {errors.contactNo && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.contactNo.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium">
                                        {profile?.contactNo || 'n/a'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Current Address
                                </Label>
                                {isEditing ? (
                                    <div>
                                        <Input
                                            type="text"
                                            {...register('address')}
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.address.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium text-sm leading-relaxed">
                                        {profile?.address || 'n/a'}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Skills and Projects */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Skills and Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <div className="space-y-4">
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Skills
                                </Label>
                                {isEditing ? (
                                    <div>
                                        <Input
                                            type="text"
                                            {...register('skills')}
                                        />
                                        {errors.skills && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.skills.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium text-sm leading-relaxed">
                                        {Array.isArray(profile?.skills)
                                            ? profile.skills.map(
                                                  (skill: any, idx: number) => (
                                                      <span
                                                          key={idx}
                                                          className="inline-block mr-2"
                                                      >
                                                          {typeof skill ===
                                                          'string'
                                                              ? skill
                                                              : skill?.name}
                                                      </span>
                                                  ),
                                              )
                                            : null}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Projects
                                </Label>
                                {isEditing ? (
                                    <div>
                                        <Input
                                            type="text"
                                            {...register('projects')}
                                        />
                                        {errors.projects && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.projects.message}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-medium text-sm leading-relaxed">
                                        {Array.isArray(profile?.projects)
                                            ? profile.projects.map(
                                                  (
                                                      project: any,
                                                      idx: number,
                                                  ) => (
                                                      <span
                                                          key={idx}
                                                          className="inline-block mr-2"
                                                      >
                                                          {typeof project ===
                                                          'string'
                                                              ? project
                                                              : project?.name}
                                                      </span>
                                                  ),
                                              )
                                            : null}
                                    </p>
                                )}
                            </div>
                        </div> */}
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
