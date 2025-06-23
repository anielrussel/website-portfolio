'use client';

import { useState } from 'react';

import { Edit, Mail, MapPin, Phone, Save, User, X } from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile() {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // Sample profile data - replace with actual data
    const profile = {
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
        position: 'Senior Software Engineer',
        image: '/placeholder.svg?height=200&width=200',
        address: '123 Tech Street, San Francisco, CA 94105',
        email: 'john.doe@example.com',
        contactNo: '+1 (555) 123-4567',
    };

    const handleToggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    return (
        <div className="w-full mx-auto py-2 px-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile Setup</h2>
                {isEditing ? (
                    <div className="space-x-2">
                        <Button variant="outline" size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleToggleEdit}
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

            {/* Main Profile Card */}
            <div className="flex items-end gap-2">
                <div className="relative h-36 rounded-xl w-44 border">
                    <Image
                        src={'/profile.webp'}
                        fill
                        objectFit="cover"
                        objectPosition="center"
                        alt="profile"
                        className="rounded-lg"
                    />
                </div>
                {isEditing && (
                    <Input type="file" name="image" className="max-w-xs" />
                )}
            </div>

            {/* Detailed Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Details */}
                <Card className="bg-secondary">
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
                                    <Input type="text" name="firstName" />
                                ) : (
                                    <p className="font-medium">
                                        {profile.firstName}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground">
                                    Last Name
                                </Label>
                                {isEditing ? (
                                    <Input type="text" name="lastName" />
                                ) : (
                                    <p className="font-medium">
                                        {profile.lastName}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Middle Name
                            </Label>
                            {isEditing ? (
                                <Input type="text" name="middleName" />
                            ) : (
                                <p className="font-medium">
                                    {profile.middleName}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Position
                            </Label>
                            {isEditing ? (
                                <Input type="text" name="position" />
                            ) : (
                                <p className="font-medium">
                                    {profile.position}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Summary */}
                <Card className="bg-secondary">
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
                                <Input type="text" name="email" />
                            ) : (
                                <p className="font-medium">{profile.email}</p>
                            )}
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Phone Number
                            </Label>
                            {isEditing ? (
                                <Input type="text" name="contactNo" />
                            ) : (
                                <p className="font-medium">
                                    {profile.contactNo}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Current Address
                            </Label>
                            {isEditing ? (
                                <Input type="text" name="address" />
                            ) : (
                                <p className="font-medium text-sm leading-relaxed">
                                    {profile.address}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Skills and Projects */}
            <Card className="bg-secondary">
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
                                <Input type="text" name="skills" />
                            ) : (
                                <p className="font-medium text-sm leading-relaxed">
                                    {profile.address}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Projects
                            </Label>
                            {isEditing ? (
                                <Input type="text" name="skills" />
                            ) : (
                                <p className="font-medium text-sm leading-relaxed">
                                    {profile.address}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
