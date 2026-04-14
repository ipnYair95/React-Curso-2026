export interface User{
    id: number;
    name: string;
    location: string;
    role: string
}

export const getUserAction = async (id: number) => {

    console.log("llamado")

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("reselto")

    return {
        id,
        name: 'Yair Marin',
        location: 'Ottawa, Canada',
        role: 'Admin'
    }

}