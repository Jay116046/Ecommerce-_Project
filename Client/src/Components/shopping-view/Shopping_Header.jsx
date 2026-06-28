import { Avatar, AvatarFallback } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { shoppingViewHeaderMenuItems } from "@/config"
import { logOut } from "@/store/authSlice"
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import CartWrapper from "./CartWrapper"
import { useEffect, useState } from "react"
import { fetchCartDetails } from "@/store/shop/cart-slice"
import { Label } from "../ui/label"

function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleNavigate = (getCurrentItem) => {
        sessionStorage.removeItem('filters');

        const currentFilter = getCurrentItem.id !== 'home' && getCurrentItem.id !== "products" && getCurrentItem.id !== "search" ? {
            category: [getCurrentItem.id]
        } : null

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));

        location.pathname.includes("listing") && currentFilter !== null
            ?
            setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`)) : navigate(getCurrentItem.path);
    }

    return <>
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {
                shoppingViewHeaderMenuItems.map((menuItem) => (
                    <Label
                        onClick={() => handleNavigate(menuItem, "category")}
                        key={menuItem.id}
                        className="text-lg font-medium cursor-pointer">
                        {menuItem.label}
                    </Label>
                ))
            }
        </nav>
    </>
}

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const disPatch = useDispatch();

    const handleLogOut = () => {
        disPatch(logOut()).then(() => {
            toast.info('logOut successfully')
        })
    }
    useEffect(() => {
        disPatch(fetchCartDetails(user?.id))
    }, [disPatch])
    // console.log(cartItems);


    return <>
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">

            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <Button onClick={() => setOpenCartSheet(true)} variant="outline" className="relative" size="icon">
                    <span  className="absolute top-[-8px] right-[-6px] bg-black text-white p-1 rounded-lg ">{cartItems?.items?.length}</span>
                    <ShoppingCart className="w-8 h-8" />
                    <span className="sr-only">User Cart</span>
                </Button>
                <CartWrapper
                    setOpenCartSheet={setOpenCartSheet}
                    cartItemsList={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
            </Sheet>

            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black">
                        <AvatarFallback className="bg-black text-white font-extrabold">
                            {user?.userName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="right" className="w-56 bg-slate-50">

                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { navigate("/shop/account") }}>
                        <UserCog className="mr-2 h-4 w-4" /> Account
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogOut}>
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    </>
}

function Shopping_Header() {

    const { isAuthenticated } = useSelector((state) => state.auth)


    return <>
        <header className="sticky top-0 z-40 w-full border-b bg-slate-50">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <HousePlug />
                    <span className="font-bold text-xl">Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full max-w-xs p-2 bg-slate-200">
                        <MenuItems />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems /></div>
                <div className="">
                    {
                        isAuthenticated ? <HeaderRightContent /> : null
                    }
                </div>
            </div>
        </header>
    </>
}

export default Shopping_Header