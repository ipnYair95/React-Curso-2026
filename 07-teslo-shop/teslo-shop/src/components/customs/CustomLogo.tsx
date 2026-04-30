import { Link } from "react-router"

interface IProps {
    subTitle?: string;
}

export const CustomLogo = ({ subTitle = 'Shop' }: IProps) => {
    return (
        <Link to="/" className="flex items-center whitespace-nowrap">

            <span className="font-montserrat font-bold text-xl m-0 whitespace-nowrap">
                Teslo |
            </span>

            <p className="text-muted-foreground m-0 whitespace-nowrap px-2">
                {subTitle}
            </p>
        </Link>

    )
}
