import type { User } from "@/interfaces/user.interface";

export interface IAuthResponse {
    user:  User;
    token: string;
}
 