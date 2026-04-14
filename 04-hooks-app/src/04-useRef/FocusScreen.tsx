import { useRef } from "react"


export const FocusScreen = () => {

    const inputRef = useRef<HTMLInputElement | null>(null)
    
    const handleClick = () => {

        console.log(inputRef?.current?.value)
        
        inputRef.current?.select();

    }
    return (
        <div className="bg-gradient flex flex-col gap-4">

            <h1 className="text-2xl font-thin text-white">Focus Screen</h1>

            <input
                ref={inputRef}
                className="bg-white text-black px-4 py-2 rounded-md"
                type="text" />

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600" onClick={handleClick}>
                Focus
            </button>

        </div>
    )
}
