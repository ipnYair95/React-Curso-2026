import { tesloApi } from "@/api/teslo-api";
import type { IAuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<IAuthResponse> => {

    const token = localStorage.getItem('token') || null;

    if (!token) {
        throw new Error('Token not found');
    }

    try {
        const { data } = await tesloApi.get<IAuthResponse>('/auth/check-status');

        localStorage.setItem('token', data.token);

        return data;

    } catch {
        localStorage.removeItem('token');
        throw new Error('Token not valid');
    }

}