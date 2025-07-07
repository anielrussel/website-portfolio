'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import {
    Edit,
    ExternalLink,
    FolderOpen,
    Github,
    ImageOff,
    Plus,
    Trash2,
} from 'lucide-react';
import Image from 'next/image';

import { getProjectsAsync } from '@/app/actions/project-actions';
import ProjectsForm from '@/components/admin/projects/projects-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjectStore } from '@/store/api-data/project-store';
import { ProjectType } from '@/types/api-data/project';
import { ActionMode } from '@/types/general';

export default function Projects() {
    const {
        projects,
        loadProjects,
        selectProject,
        selectedProject,
        resetSelectedProject,
    } = useProjectStore();

    const [mode, setMode] = useState<ActionMode | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = (project?: ProjectType) => {
        if (project) {
            setMode('edit');
            selectProject(project);
        } else {
            setMode('add');
            resetSelectedProject();
        }
        setIsDialogOpen(true);
    };

    const handleOpenDeleteDialog = (project: ProjectType) => {
        setMode('delete');
        selectProject(project);
        setIsDialogOpen(true);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = '/placeholder.svg?height=200&width=300';
    };

    const fetchProjects = async () => {
        try {
            const response = await getProjectsAsync();
            if (response.success) loadProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto py-2 px-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Projects Management</h2>
                    <p className="text-muted-foreground">
                        Showcase your work and achievements
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog()}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>

            {/* Add, Edit, and Delete Modal */}
            <ProjectsForm
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode={mode}
                values={selectedProject}
            />

            {/* Projects Display */}
            {projects.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No projects added yet
                        </h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Start showcasing your work by adding your first
                            project
                        </p>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Project
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-48 object-contain"
                                        width={500}
                                        height={500}
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div className="w-full h-48 object-cover flex justify-center items-center">
                                        <ImageOff
                                            size={40}
                                            className="text-gray-500"
                                        />
                                    </div>
                                )}

                                <div className="absolute top-2 right-2 flex gap-1">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            handleOpenDialog(project)
                                        }
                                        // className="bg-white/90 hover:bg-white"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            handleOpenDeleteDialog(project)
                                        }
                                        // className="bg-white/90 hover:bg-white"s
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="truncate">
                                        {project.name}
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className="ml-2 text-xs"
                                    >
                                        {project.profileId}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex gap-2">
                                    {project.url && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="flex-1"
                                        >
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}

                                    {project.repoLink && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="flex-1"
                                        >
                                            <a
                                                href={project.repoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <Github className="w-4 h-4" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            {projects.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Projects Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {projects.length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Total Projects
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {projects.filter((p) => p.url).length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Live Demos
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {projects.filter((p) => p.repoLink).length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    With Repository
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {
                                        new Set(
                                            projects.map((p) => p.profileId),
                                        ).size
                                    }
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Profiles
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
