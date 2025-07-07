import { UserType } from './user';

export type AuthResponseType = {
    user: UserType;
    token: string;
    refreshToken: string;
};
