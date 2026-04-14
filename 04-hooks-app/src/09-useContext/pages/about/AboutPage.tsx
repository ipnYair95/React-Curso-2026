import { UserContext } from '@/09-useContext/context/UserContext';
import { Button } from '@/components/ui/button';
import { use } from 'react';
import { Link } from 'react-router'

export const AboutPage = () => {

    const { isAuthenticated, logout } = use(UserContext);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>

            <h1 className='text-4xl font-bold'>Página sobre nosotros</h1>

            <hr />

            <div className='flex flex-col gap-4 my-10'>

                {
                    isAuthenticated && <Link to="/profile" className='hover:text-blue-600 underline text-2xl' >
                        Perfil
                    </Link>
                }

                {
                    isAuthenticated
                        ? (
                            <Button variant='destructive' className='text-2xl' onClick={logout}>
                                Cerrar sesión
                            </Button>
                        )
                        : (
                            <Link to="/login" className='hover:text-blue-600 underline text-2xl'>
                                Iniciar sesión
                            </Link>

                        )
                }

            </div>

        </div>
    )
}
