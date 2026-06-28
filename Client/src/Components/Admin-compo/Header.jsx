import { LogOut, AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { toast } from "sonner";
import { logOut, resetTokenAndCredentials } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

function Admin_Header({ setopenSidebar }) {

    const disPatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        // disPatch(logOut()).then(() => {
        //     toast.info('logOut successfully')
        // })
        disPatch(resetTokenAndCredentials())
        sessionStorage.clear();
        navigate('/auth/login');
    }


    return (
        <>
            <div className="flex  items-center justify-between px-4 py-3 ">
                <Button onClick={() => setopenSidebar(true)} className='lg:hidden sm:block bg-black text-white'>
                    <AlignJustify />
                    <span className="sr-only">side-menu</span>
                </Button>
                <div className="flex flex-1 justify-end " >
                    <Button className='bg-black text-white inline-flex gap-2 items-center rounded-md px-4 py-2 sm font-medium shadow'
                        onClick={handleLogOut}
                    >
                        <LogOut className="" />
                        Logout
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Admin_Header