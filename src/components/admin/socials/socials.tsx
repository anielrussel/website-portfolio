'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import {
    Edit,
    ExternalLink,
    Facebook,
    Github,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MessageCircle,
    Plus,
    Share2,
    Trash2,
    Twitter,
    Youtube,
} from 'lucide-react';

import { getSocialLinksAsync } from '@/app/actions/social-link-actions';
import SocialsForm from '@/components/admin/socials/socials-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function Socials() {
    const { profile } = useProfileStore();
    const {
        socials,
        loadSocials,
        selectSocial,
        selectedSocial,
        resetSelectedSocial,
    } = useSocialLinkStore();

    const [mode, setMode] = useState<ActionMode | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [prefilledData, setPrefilledData] =
        useState<Partial<SocialLinksType> | null>(null);

    const handleOpenDialog = (socialLink?: SocialLinksType) => {
        if (socialLink) {
            setMode('edit');
            selectSocial(socialLink);
        } else {
            setMode('add');
            resetSelectedSocial();
        }
        setIsDialogOpen(true);
    };

    const handleOpenDeleteDialog = (social: SocialLinksType) => {
        setMode('delete');
        selectSocial(social);
        setIsDialogOpen(true);
    };

    const handleQuickAdd = (platform: (typeof iconOptions)[0]) => {
        setMode('add');
        resetSelectedSocial();
        setPrefilledData({
            id: 0,
            name: platform.label,
            url: '',
            icon: platform.value,
            profileId: profile?.id || 0,
        });
        setIsDialogOpen(true);
    };

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find(
            (option) => option.value === iconName,
        );
        return iconOption
            ? { icon: iconOption.icon, color: iconOption.color }
            : { icon: Share2, color: 'text-gray-500' };
    };

    const groupedSocialLinks = socials.reduce(
        (acc, link) => {
            const profileKey = `Profile ${link.profileId}`;
            if (!acc[profileKey]) {
                acc[profileKey] = [];
            }
            acc[profileKey].push(link);
            return acc;
        },
        {} as Record<string, SocialLinksType[]>,
    );

    const fetchSocialLinks = async () => {
        try {
            const response = await getSocialLinksAsync();
            if (response.success) {
                loadSocials(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch social links:', error);
        }
    };

    useEffect(() => {
        fetchSocialLinks();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        Social Links Management
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your social media profiles and online presence
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog()}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Social Link
                </Button>
            </div>

            {/* Add, Edit, and Delete Modal */}
            <SocialsForm
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode={mode}
                values={selectedSocial}
                prefilledData={prefilledData}
            />

            {/* Social Links Display */}
            {socials.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Share2 className="w-12 h-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No social links added yet
                        </h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Start building your online presence by adding your
                            social media profiles
                        </p>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Social Link
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedSocialLinks).map(
                        ([profileGroup, profileLinks]) => (
                            <Card key={profileGroup}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        {profileGroup}
                                        <Badge variant="secondary">
                                            {profileLinks.length} links
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {profileLinks.map((link) => {
                                            const {
                                                icon: IconComponent,
                                                color,
                                            } = getIconComponent(link.icon);
                                            return (
                                                <div
                                                    key={link.id}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="p-2 bg-primary/10 rounded-md flex-shrink-0">
                                                            <IconComponent
                                                                className={`w-5 h-5 ${color}`}
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="font-medium truncate">
                                                                {link.name}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground truncate">
                                                                {link.url}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <a
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="Visit link"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleOpenDialog(
                                                                    link,
                                                                )
                                                            }
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() =>
                                                                handleOpenDeleteDialog(
                                                                    link,
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

            {/* Quick Add Popular Platforms */}
            {socials.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Add Popular Platforms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {iconOptions.slice(0, 5).map((platform) => {
                                const IconComponent = platform.icon;
                                const hasLink = socials.some(
                                    (link) => link.icon === platform.value,
                                );
                                return (
                                    <Button
                                        key={platform.value}
                                        variant={
                                            hasLink ? 'secondary' : 'outline'
                                        }
                                        size="sm"
                                        onClick={() => {
                                            if (!hasLink) {
                                                handleQuickAdd(platform);
                                            }
                                        }}
                                        disabled={hasLink}
                                        className="flex items-center gap-2"
                                    >
                                        <IconComponent
                                            className={`w-4 h-4 ${platform.color}`}
                                        />
                                        {platform.label}
                                        {hasLink && (
                                            <Badge
                                                variant="secondary"
                                                className="ml-1 text-xs"
                                            >
                                                Added
                                            </Badge>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Summary Stats */}
            {socials.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Social Links Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {socials.length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Total Links
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Object.keys(groupedSocialLinks).length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Profiles
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {
                                        new Set(
                                            socials.map((link) => link.icon),
                                        ).size
                                    }
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Platforms
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Math.max(
                                        ...Object.values(
                                            groupedSocialLinks,
                                        ).map((links) => links.length),
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Max per Profile
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
