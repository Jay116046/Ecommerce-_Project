import { Outlet } from "react-router-dom"
import Admin_Header from "../../Components/Admin-compo/Header"
import SideBar from "./SideBar"
import { useState } from "react"



function AdminLayout() {

    const [openSidebar,setopenSidebar] = useState(false);
    
    return (
        <>
            <div className="flex min-h-screen w-full">
                {/* sidebar part */}
                <SideBar open={openSidebar} onOpenChange={setopenSidebar} />

                <div className="flex flex-1 flex-col">

                {/* header part */}
                <Admin_Header setopenSidebar={setopenSidebar}/>
                {/* main view */}

                    <main className=" flex-1 flex-col flex bg-[#f3f4f6]  p-4 md:p-6">
                    <Outlet />
                </main>
                </div>
            </div>

        </>
    )
}

export default AdminLayout