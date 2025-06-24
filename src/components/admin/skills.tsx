'use client';

import type React from 'react';
import { useState } from 'react';

import {
    Code,
    Database,
    Edit,
    Globe,
    Palette,
    Plus,
    Server,
    Smartphone,
    Trash2,
} from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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

type Skill = {
    id: string;
    name: string;
    icon: string;
    category: string;
};

const iconOptions = [
    { value: 'Code', label: 'Code', icon: Code },
    { value: 'Palette', label: 'Palette', icon: Palette },
    { value: 'Server', label: 'Server', icon: Server },
    { value: 'Database', label: 'Database', icon: Database },
    { value: 'Globe', label: 'Globe', icon: Globe },
    { value: 'Smartphone', label: 'Smartphone', icon: Smartphone },
];

const categoryOptions = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Mobile',
    'Design',
    'Other',
];

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([
        { id: '1', name: 'React', icon: 'Code', category: 'Frontend' },
        { id: '12', name: 'React', icon: 'Code', category: 'Frontend' },
        { id: '2', name: 'Node.js', icon: 'Server', category: 'Backend' },
        { id: '3', name: 'PostgreSQL', icon: 'Database', category: 'Database' },
        { id: '4', name: 'Figma', icon: 'Palette', category: 'Design' },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        icon: '',
        category: '',
    });

    const handleOpenDialog = (skill?: Skill) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData({
                name: skill.name,
                icon: skill.icon,
                category: skill.category,
            });
        } else {
            setEditingSkill(null);
            setFormData({
                name: '',
                icon: '',
                category: '',
            });
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingSkill(null);
        setFormData({
            name: '',
            icon: '',
            category: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.icon || !formData.category) {
            return;
        }

        if (editingSkill) {
            // Update existing skill
            setSkills(
                skills.map((skill) =>
                    skill.id === editingSkill.id
                        ? { ...skill, ...formData }
                        : skill,
                ),
            );
        } else {
            // Add new skill
            const newSkill: Skill = {
                id: Date.now().toString(),
                ...formData,
            };
            setSkills([...skills, newSkill]);
        }

        handleCloseDialog();
    };

    const handleDelete = (skillId: string) => {
        setSkills(skills.filter((skill) => skill.id !== skillId));
    };

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find(
            (option) => option.value === iconName,
        );
        return iconOption ? iconOption.icon : Code;
    };

    const groupedSkills = skills.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        },
        {} as Record<string, Skill[]>,
    );

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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog()}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Skill
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Skill Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="e.g., React, Python, Figma"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="icon">Icon</Label>
                                <Select
                                    value={formData.icon}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            icon: value,
                                        })
                                    }
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
                                                        <IconComponent className="w-4 h-4" />
                                                        {option.label}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            category: value,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryOptions.map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseDialog}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingSkill
                                        ? 'Update Skill'
                                        : 'Add Skill'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

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
                                            const IconComponent =
                                                getIconComponent(skill.icon);
                                            return (
                                                <div
                                                    key={skill.id}
                                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-primary/10 rounded-md">
                                                            <IconComponent className="w-5 h-5 text-primary" />
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
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Delete
                                                                        Skill
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you
                                                                        sure you
                                                                        want to
                                                                        delete "
                                                                        {
                                                                            skill.name
                                                                        }
                                                                        "? This
                                                                        action
                                                                        cannot
                                                                        be
                                                                        undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>
                                                                        Cancel
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                skill.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
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
            {skills.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Skills Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {skills.length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Total Skills
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Object.keys(groupedSkills).length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Categories
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Math.max(
                                        ...Object.values(groupedSkills).map(
                                            (skills) => skills.length,
                                        ),
                                    )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Largest Category
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {Object.entries(groupedSkills).find(
                                        ([, skills]) =>
                                            skills.length ===
                                            Math.max(
                                                ...Object.values(
                                                    groupedSkills,
                                                ).map((s) => s.length),
                                            ),
                                    )?.[0] || 'N/A'}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Top Category
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
