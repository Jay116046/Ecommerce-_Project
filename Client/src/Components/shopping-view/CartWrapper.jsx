import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import CartItemContent from "./CartItemsContent";

function CartWrapper({cartItemsList,setOpenCartSheet}) {

    const navigate = useNavigate();
    

    const total_CartAmount = cartItemsList && 
    cartItemsList.length > 0 
    ? (cartItemsList.reduce((sum,cartItem)=>
        sum+((cartItem?.salePrice > 0 ? cartItem?.salePrice: cartItem?.price)*cartItem.quantity),0)) 
    : 0
    
    return <>
        <SheetContent className="bg-slate-200 sm:max-w-md p-3">
            <SheetHeader>
                <SheetTitle>
                    Your Cart
                </SheetTitle>
            </SheetHeader>
            <div className="mt-2 space-y-4">
                {
                    cartItemsList && cartItemsList.length > 0 
                    ? cartItemsList.map((item)=>(
                            <CartItemContent key={item.productId} item={item}/>
                    )) : null
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">  
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total_CartAmount}</span>
                </div>
            </div>
            <Button onClick={()=>{
                navigate('/shop/checkout') 
                setOpenCartSheet(false)
                }} className="bg-black w-full text-white ">CheckOut</Button>

        </SheetContent>
    </>
}
export default CartWrapper