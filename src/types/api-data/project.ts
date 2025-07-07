import { ProjectSkillType } from './project-skill';

export type ProjectType = {
    id: number;
    name: string;
    description: string;
    image: string;
    url: string;
    repoLink: string;
    profileId: number;
    projectSkills: ProjectSkillType[];
};
