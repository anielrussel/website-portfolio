export type UserType = {
    id: number;
    username: string;
    hashPassword: string;
    role: string;
    refreshToken: string;
    refreshTokenExpiryDate: Date;
};
