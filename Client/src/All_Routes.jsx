import { Route, Routes } from "react-router-dom"
import AuthLayout from "./Components/AuthLayout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./pages/Admin-view/AdminLayout"
import DashBoard from "./pages/Admin-view/DashBoard"
import Products from "./pages/Admin-view/Products"
import Orders from "./pages/Admin-view/Orders"
import Features from "./Components/Admin-compo/Features"
import Shop_Home from "./pages/Shop-view/Home"
import Shop_Layout from "./pages/Shop-view/Layout"
import Shop_Listing from "./pages/Shop-view/Listing"
import Shop_Account from "./pages/Shop-view/Account"
import Shop_Checkout from "./pages/Shop-view/Checkout"
import Not_Found from "./NotFound/Notfound"
import Check_Auth from "./Components/common/Check-Auth"
import Un_Auth from "./pages/un-auth page"
import { useDispatch, useSelector } from "react-redux"
import PaypalReturn from "./pages/Shop-view/paypal-return"
import PaymentSuccess from "./pages/Shop-view/payment-success"
import SearchProducts from "./Components/shopping-view/SearchProducts"
import { Skeleton } from "./Components/ui/skeleton"


function AllRoutes() {

    // const isAuthenticated = false;
    // const user = {
    //     name:'rohit',
    //     roll:'admin'
    // };

    const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)

    if (isLoading) {
        return <Skeleton className="h-[20px] w-[100px] rounded-full bg-black p-2" />
    }

    return (
        <>
            <Routes>

                <Route path="/"
                    element={
                        <Check_Auth isAuthenticated={isAuthenticated} user={user}>
                        </Check_Auth>}
                >
                </Route>

                <Route path="/auth" element={
                    <Check_Auth isAuthenticated={isAuthenticated} user={user}>
                        <AuthLayout />
                    </Check_Auth>
                }>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>


                <Route path="/admin" element={
                    <Check_Auth isAuthenticated={isAuthenticated} user={user}>
                        <AdminLayout />
                    </Check_Auth>
                }>
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="features" element={<Features />} />
                </Route>


                <Route path="/shop" element={
                    <Check_Auth isAuthenticated={isAuthenticated} user={user}>
                        <Shop_Layout />
                    </Check_Auth>
                }>
                    <Route path="home" element={<Shop_Home />} />
                    <Route path="listing" element={<Shop_Listing />} />
                    <Route path="search" element={<SearchProducts />} />
                    <Route path="account" element={<Shop_Account />} />
                    <Route path="checkout" element={<Shop_Checkout />} />
                    <Route path="paypal-return" element={<PaypalReturn />} />
                    <Route path="payment-success" element={<PaymentSuccess />} />
                    <Route path="paypal-cancle" element={<PaypalReturn />} />
                </Route>

                <Route path="/unauth-page" element={<Un_Auth />} />

                <Route path="*" element={<Not_Found />} />
            </Routes>

        </>
    )
}


export default AllRoutes