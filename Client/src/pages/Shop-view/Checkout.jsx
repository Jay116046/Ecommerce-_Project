import { useDispatch, useSelector } from 'react-redux'
import img from '../../assets/images/checkout.webp'
import CartItemContent from '@/Components/shopping-view/CartItemsContent'
import AddressCard from './AddressCard';
import Address from './Address';
import { Button } from '@/Components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { toast } from 'sonner';

function Shop_Checkout() {

    const { cartItems } = useSelector(state => state.shopCart);
    const { user } = useSelector(state => state.auth);
    const { approvalUrl } = useSelector(state => state.shopOrder)
    const [currentSelectAddress, setcurrentSelectAddress] = useState(null);
    const [isPaymentStart, setIsPaymentStart] = useState(false);

    const disPatch = useDispatch();

    if(cartItems.length === 0){
        toast.warning("your cart is empty!")
    }

    if(currentSelectAddress===null){
        toast.warning('plese select any one address');
    }


    const total_CartAmount = cartItems && cartItems.items &&
        cartItems.items.length > 0
        ? (cartItems.items.reduce((sum, cartItem) =>
            sum + ((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem.quantity), 0))
        : 0
        

    const handleInitiatePayPalPayment = () => {

        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems:cartItems.items.map((singleCartItem) => ({
                productId: singleCartItem?.productId,
                title: singleCartItem?.title,
                image: singleCartItem?.image,
                price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
                quantity: singleCartItem?.quantity
            })),
            addressInfo: {
                addressId: currentSelectAddress?._id,
                address: currentSelectAddress?.address,
                city: currentSelectAddress?.city,
                pincode: currentSelectAddress?.pinCode,
                phone: currentSelectAddress?.phone,
                notes: currentSelectAddress?.notes
            },
            orderStatus: "pending",
            paymentMethod: "paypal",
            paymentStatus: "pending",
            totalAmount: total_CartAmount,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: '',
            payerId: ''
        }

        console.log(orderData);

        disPatch(createNewOrder(orderData)).then((data) => {
            // console.log(data);
            if (data?.payload?.success) {
                setIsPaymentStart(true);
            }
            else {
                setIsPaymentStart(false);
            }
        })

    }

    // console.log(currentSelectAddress);

    if (approvalUrl) {
        window.location.href = approvalUrl;
    }


    return (
        <>
            {/* Shop_Checkout */}
            <div className="flex flex-col">
                <div className="relative h-[300px] w-full overflow-hidden ">
                    <img
                        src={img}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                    <Address selectedId={currentSelectAddress?._id} setcurrentSelectAddress={setcurrentSelectAddress} />
                    <div className="flex flex-col gap-4">
                        {
                            cartItems && cartItems.items && cartItems.items.length > 0 ?
                                cartItems.items.map((cartItem, idx) =>

                                    <div className="" key={idx}>

                                        <CartItemContent item={cartItem} />
                                    </div>
                                )
                                : null
                        }
                        <hr />
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="font-bold">Total</span>
                                <span className="font-bold">${total_CartAmount}</span>
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <Button onClick={handleInitiatePayPalPayment} className="w-full  text-lg bg-black text-white">
                                
                                {
                                 isPaymentStart ? <> payment in Prossesing.... </> : <> Checkout with Paypal </>
                                }
                                </Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default Shop_Checkout