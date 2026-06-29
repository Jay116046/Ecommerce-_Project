import { Outlet } from "react-router-dom"

function AuthLayout() {
    return(
        <>
            <div className="flex lg:flex-row flex-col justify-center items-center h-screen">
                <div className="bg-black text-center text-white w-full lg:w-[50%] h-full flex justify-center items-center font-bold text-5xl">
                        Welcome to E-Commerce Shopping
                </div>
                <Outlet />
            </div>
        </>
    )
}


export default AuthLayout