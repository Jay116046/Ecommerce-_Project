import { Badge } from "@/Components/ui/badge";
import { DialogContent } from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"
import { getOrderByUserId } from "@/store/shop/order-slice";


function ShoppingOrdersDetailsView({ orderDetails, userName }) {

    return <>
        <DialogContent className="sm:max-w-[600px] bg-slate-300">
            <div className="grid gap-6">
                <div className="grid gap-2 ">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">OrderId</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.orderStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order State</p>
                        <Label><Badge className={`${orderDetails?.paymentStatus == 'paid' ? "bg-green-400" : "bg-black"} text-white rounded-md p-2`}>
                            {orderDetails?.paymentStatus}
                        </Badge></Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>{orderDetails?.totalAmount}</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">

                            {
                                orderDetails?.cartItems.map((item) => (
                                    <li className="flex justify-between items-center" key={item._id}>
                                        <span className="">{item?.title}</span>
                                        <span className="">{item?.price}</span>
                                    </li>
                                ))
                            }

                            {/* <li className="flex justify-between items-center">
                                <span className="">Product One</span>
                                <span className="">$400</span>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-gray-600">
                            <span>Name: {userName}</span>
                            <span>Address: {orderDetails?.addressInfo[0].address}</span>
                            <span>City: {orderDetails?.addressInfo[0].city}</span>
                            <span>Pincode: {orderDetails?.addressInfo[0].pincode}</span>
                            <span>Phone: {orderDetails?.addressInfo[0].phone}</span>
                            <span>notes: {orderDetails?.addressInfo[0].notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    </>
}


export default ShoppingOrdersDetailsView