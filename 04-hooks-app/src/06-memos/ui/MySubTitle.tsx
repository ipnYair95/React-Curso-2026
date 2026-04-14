import { memo } from "react"

interface IProps {
    subTitle: string
    callMyApi: () => void
}

export const MySubTitle = memo(({ subTitle, callMyApi }: IProps) => {

    console.log("Subtitle render")

    return (
        <>

            <h6 className="text-2xl font-bold">
                {subTitle}
            </h6>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={callMyApi}>
                Llamar a funcion
            </button>

        </>
    )
})
