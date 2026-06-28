import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCart, upadateCart } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function CartItemContent({ item }) {

    const disPatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { productList } = useSelector(state => state.shopProducts)

    const handleDeleteCartItem = (productId) => {
        disPatch(deleteCart({ userId: user?.id, productId: productId })).then(() => {
            // console.log("delete cart item");
            toast.info("item delete from cart")
        })
    }

    const handleUpdateCart = (productId, quantity) => {

        if (productList) {
            const indexOfCurrentItem = productList.findIndex(item => item._id == productId);
            let totalStock = productList[indexOfCurrentItem].totalStock;
            // console.log(totalStock);

            if (quantity > totalStock) {
                toast.warning(`only ${totalStock} qantity add for this product`);
                return;
            }

        }
        disPatch(upadateCart({ userId: user?.id, productId: productId, quantity: quantity }))
    }

    return <>
        <div className="flex items-center space-x-4">
            <img
                src={item?.image}
                alt={item?.title}
                className="w-16 h-16 object-cover"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{item?.title}</h3>
                <div className="flex items-center mt-1 gap-2">
                    <Button
                        onClick={() => { handleUpdateCart(item?.productId, item?.quantity - 1) }}
                        variant="outline"
                        size="icon"
                        disabled={item?.quantity === 1}
                        className="h-5 w-5">
                        <Minus className="w-2 h-2" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="">{item?.quantity}</span>
                    <Button
                        onClick={() => { handleUpdateCart(item?.productId, item?.quantity + 1) }}
                        variant="outline"
                        size="icon"
                        className="h-5 w-5">
                        <Plus className="w-2 h-2" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ${
                        ((item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity).toFixed(2)
                    }
                </p>
                <Trash onClick={() => { handleDeleteCartItem(item?.productId) }} className="cursor-pointer mt-1" size={20} />
            </div>
        </div>
    </>
}

export default CartItemContent