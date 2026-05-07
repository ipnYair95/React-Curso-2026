import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { LoginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'checking' | 'not-authenticated';

type AuthState = {

    user?: User | null;
    token?: string | null;
    authStatus: AuthStatus;

    isAdmin: () => boolean;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAutStatus: () => Promise<boolean>;

}

export const useAuthStore = create<AuthState>()((set, get) => ({

    user: null,
    token: null,
    authStatus: 'checking',

    isAdmin: () => {        

        const roles = get().user?.roles || [];

        return roles.includes('admin');

    },

    login: async (email: string, password: string) => {

        try {

            const data = await LoginAction(email, password);

            localStorage.setItem('token', data.token);

            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated'
            });

            return true;

        } catch {

            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated'
            });

            localStorage.removeItem('token');

            return false;

        }
    },
    logout: () => {

        set({
            user: null,
            token: null,
            authStatus: 'not-authenticated'
        });

        localStorage.removeItem('token');
    },
    checkAutStatus: async () => {

        try {

            const { user, token } = await checkAuthAction();

            set({
                user,
                token,
                authStatus: 'authenticated'
            });

            return true;

        } catch {

            localStorage.removeItem('token');

            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            });

            return false;

        }

    }

})) 