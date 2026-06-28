import { Navigate, useLocation } from 'react-router-dom'


function Check_Auth({ isAuthenticated, user, children }) {



    const location = useLocation();

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" />
        }
        else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />
            }
            else {
                return <Navigate to='/shop/home' />
            }
        }
    }

    if (!isAuthenticated && (location.pathname.includes('/shop') || location.pathname.includes('/admin'))) {
        return <Navigate to="/auth/login" />
    }

    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        if (user?.roll === "admin") {
            return <Navigate to="/admin/dashboard" />
        }
        else {
            return <Navigate to='/shop/home' />
        }
    }

    if (isAuthenticated && user?.roll === "admin" && location.pathname.includes("shop")) {
        return <Navigate to='/admin/dashboard' />
    }

    if (isAuthenticated && user?.roll !== "admin" && location.pathname.includes("admin")) {
        return <Navigate to='/unauth-page' />
    }

    return (
        <>
            {children}
        </>
    )


}

export default Check_Auth