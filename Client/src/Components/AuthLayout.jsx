import { Outlet } from "react-router-dom"

function AuthLayout() {
    return(
        <>
            <div className="flex lg:flex-row flex-col  items-center h-screen ">
                <div className="bg-black text-center text-white w-full lg:w-[50%] h-[30%] lg:h-full flex justify-center items-center font-bold text-3xl lg:text-5xl mb-8 lg:mb-0">
                        Welcome to E-Commerce Shopping
                </div>
                <Outlet />
            </div>
        </>
    )
}


export default AuthLayout