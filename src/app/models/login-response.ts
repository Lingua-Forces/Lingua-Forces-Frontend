import { UserProfile } from "./user-profile";

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user:UserProfile;
}