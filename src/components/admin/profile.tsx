'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Phone, Save, User, X } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    getProfileByIdAsync,
    updateProfileAsync,
} from '@/app/actions/profile-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { profileSchema } from '@/schema/profile-schema';
import { useProfileStore } from '@/store/api-data/profile-store';

export default function Profile() {
    const { profile, loadProfile, updateProfile } = useProfileStore();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setValue,
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
            skills: [],
            projects: [],
            socialLinks: [],
            userId: 0,
            image: '',
        },
    });

    const handleToggleEdit = () => {
        if (isEditing) {
            // Reset form when canceling edit
            reset();
        }
        setIsEditing((prev) => !prev);
    };

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        try {
            const response = await updateProfileAsync(data.id, data);
            if (response.success) {
                updateProfile(response.data);
                setIsEditing(false);
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
                    skills: response.data.skills || '',
                    projects: response.data.projects || '',
                    socialLinks: response.data.socialLinks || '',
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
                skills: Array.isArray(profile.skills)
                    ? profile.skills.map((skill: any) =>
                          typeof skill === 'string' ? skill : skill.name,
                      )
                    : [],
                projects: Array.isArray(profile.projects)
                    ? profile.projects.map((project: any) =>
                          typeof project === 'string' ? project : project.name,
                      )
                    : [],
                socialLinks: Array.isArray(profile.socialLinks)
                    ? profile.socialLinks.map((social: any) =>
                          typeof social === 'string' ? social : social.name,
                      )
                    : [],
                image: profile.image || '',
                userId: profile.userId || 0,
            });
        }
    }, [profile, reset]);

    console.log(errors);

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
                            src={profile?.image || '/profile.webp'}
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
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        // Handle file upload logic here
                                        // For now, just set the filename
                                        setValue('image', file.name);
                                    }
                                }}
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
                                            {profile?.firstName}
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
                                            {profile?.lastName}
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
                                        {profile?.middleName}
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
                                        {profile?.position}
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
                                        {profile?.email}
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
                                        {profile?.contactNo}
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
                                        {profile?.address}
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
                        <div className="space-y-4">
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
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
