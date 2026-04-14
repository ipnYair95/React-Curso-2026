import React from "react"

interface IProps {
    title: string
}

export const MyTitle = React.memo(({ title }: IProps) => {

    console.log("My title render")

    return (
        <h1 className="text-3xl">
            {title}
        </h1>
    )
})
