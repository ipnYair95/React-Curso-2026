import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button"
import { Suspense, use } from "react"

export const ProfilePage = () => {

    const { user, logout } = use(UserContext);

    return (
        <Suspense fallback={<h1>Loading...</h1>}>

            <div className='flex flex-col items-center justify-center min-h-screen'>

                <h1 className='text-4xl font-bold'>Perfil del usuario</h1>

                <hr />

                <pre className='w-1/2 my-4 overflow-y-auto overflow-x-hidden'>
                    {
                        JSON.stringify(user, null, 2)
                    }
                </pre>

                <Button variant="destructive" onClick={logout}>
                    Cerrar sesión
                </Button>

            </div>

        </Suspense>
    )
}
