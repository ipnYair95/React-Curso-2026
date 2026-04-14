import { use, type Usable } from "react"
import { getUserAction, type User } from "./api/get-user.action"


interface Props {
    getUser: Usable<User>
}

export const ClientInformation = ({ getUser }: Props) => {

    const user = use(getUser);

    return (
        <div className="bg-gradient flex flex-col items-center gap-4">

            <h2 className="text-2xl font-thin text-white">{user.id} - #{user.name}</h2>

            <p className="text-white text-2xl">
                {user.location}
            </p>

            <p className="text-white text-2xl">
                {user.role}
            </p>

        </div>
    )
}
