import { tesloApi } from "@/api/teslo-api";
import type { IAuthResponse } from "../interfaces/auth.response";

export const LoginAction = async (email: string, password: string): Promise<IAuthResponse> => {

    try {

        const { data } = await tesloApi.post<IAuthResponse>('/auth/login', {
            email,
            password
        }); 

        return data;

    } catch (error) {
        console.log(error)
        throw error;
    }

};