import { Outlet } from "react-router-dom"
import Shopping_Header from "../../Components/shopping-view/Shopping_Header"

function Shop_Layout() {
    return(
        <>
            <Shopping_Header />
            <Outlet/>
        </>
    )
}


export default Shop_Layout