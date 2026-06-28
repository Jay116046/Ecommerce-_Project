import { ChartNoAxesCombined } from "lucide-react"
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBasket, BadgeCheck } from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


const adminMenuItems = [
    {
        name: 'dashboard',
        label: 'DashBoard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        name: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    },
    {
        name: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <BadgeCheck />
    }
]

function AdminMenu({setOpen}) {

    const navigate = useNavigate();

    return (
        <>
            <nav className="mt-8 flex-col gap-4">
                {
                    adminMenuItems.map((item, idx) => (
                        <div key={idx} onClick={() => {
                                navigate(item.path)
                                setOpen? setOpen(false):null
                        }} className="cursor-pointer text-lg flex items-center gap-2 rounded-md m-1 px-3 py-2
                                text-muted-foreground  hover:bg-slate-100  hover:font-semibold">
                            {item.icon}
                            {item.label}
                        </div>
                    ))
                }
            </nav>

        </>
    )
}


function SideBar({ open, onOpenChange }) {
    const navigate = useNavigate();

    return (
        <>
            <Fragment>
                <Sheet open={open} onOpenChange={onOpenChange}>

                    <SheetContent side="left" className='w-64 bg-slate-200' >

                        <div className="flex flex-col h-full">
                            <SheetHeader className='border-b'>
                                <ChartNoAxesCombined size={30} />
                                <SheetTitle>
                                    Admin Panel
                                </SheetTitle>
                            </SheetHeader>
                            <AdminMenu setOpen={onOpenChange} />
                        </div>
                    </SheetContent>
                </Sheet>

                <aside className="hidden w-64 flex-col border-r bg-slate-200 p-3 lg:flex ">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
                        <ChartNoAxesCombined />
                        <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                    </div>
                    <AdminMenu />
                </aside>

            </Fragment>

        </>
    )
}

export default SideBar