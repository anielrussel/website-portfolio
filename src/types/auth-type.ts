import { UserType } from './user-type';

export type AuthResponseType = {
    user: UserType;
    token: string;
    refreshToken: string;
};
