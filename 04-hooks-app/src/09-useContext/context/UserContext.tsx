import { createContext, useEffect, useState, type PropsWithChildren } from "react"
import { users, type User } from "../data/user-mock.data";

export type AuthStatus = 'checking' | 'not-authenticated' | 'authenticated'

interface UserContextProps {
    isAuthenticated: boolean;
    authStatus: AuthStatus;
    user: User | null;

    login: (userId: number) => boolean;
    logout: () => void
}

export const UserContext = createContext({

} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {

    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');

    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userId: number) => {

        const user = users.find(user => user.id === userId);

        if (!user) {
            console.log(`User no encontrado: ${userId}`);
            setUser(null);
            setAuthStatus('not-authenticated');
            return false;
        }

        setUser(user);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', userId.toString());
        return true;

    }

    const handleLogout = () => {

        setAuthStatus('not-authenticated');
        setUser(null);
        localStorage.removeItem('userId');

    }

    useEffect(() => {

        const storedUserId = localStorage.getItem('userId');

        if (!storedUserId) {
            handleLogout();
            return;
        }

        handleLogin(Number(storedUserId));

    }, []);

    return (
        <UserContext value={{
            isAuthenticated: authStatus === 'authenticated',
            authStatus,
            user,
            login: handleLogin,
            logout: handleLogout
        }}>
            {children}
        </UserContext>
    );

}