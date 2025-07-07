import { ProjectType } from './project';
import { SocialLinksType } from './social-links';

type ProfileSkillResponseType = {
    profileId: number;
    skillId: number;
};

export type ProfileType = {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
    image: string;
    address: string;
    userId: number;
    email: string;
    contactNo: string;
    socialLinks: SocialLinksType[];
    skills: ProfileSkillResponseType[];
    projects: ProjectType[];
};
