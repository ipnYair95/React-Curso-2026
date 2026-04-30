import { Outlet } from "react-router"
import { CustomHeader } from "../components/custom-header/CustomHeader"
import { CustomFooter } from "../components/custom-footer/CustomFooter"


export const ShopLayout = () => {
    return (
        <div className="min-h-screen bg-background">

            <CustomHeader />

            <Outlet />

            <CustomFooter />

        </div>
    )
}
