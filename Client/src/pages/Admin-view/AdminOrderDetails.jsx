import CommonForm from "@/Components/common/Form"
import { Badge } from "@/Components/ui/badge"
import { DialogContent } from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"
import { getOrderByAllUser, updateOrderStatus } from "@/store/admin/order-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const initialFormData = {
    status: ''
}

function AdminOrderDetailsView({ adminOrderDetails }) {

    const [formData, setFormData] = useState(initialFormData);
    const disPatch = useDispatch();


    const handleUpdateStatus = (event, id, orderStatus) => {
        disPatch(updateOrderStatus({ id: id, status: orderStatus }));
        toast.info("update successfully");
        disPatch(getOrderByAllUser());
    }

    // console.log(adminOrderDetails?.addressInfo)

    return <>
        <DialogContent className="sm:max-w-[600px] bg-slate-300 px-2">
            <div className="grid gap-3 h-[600px] overflow-auto mt-5 px-3">
                <div className="grid gap-2 ">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">OrderId</p>
                        <Label>{adminOrderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{adminOrderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order State</p>
                        <Label>
                            <Badge className={`${adminOrderDetails?.orderStatus == 'confirmed' ? "bg-green-400" : "bg-black"} text-white rounded-md p-2`}>
                                {adminOrderDetails?.orderStatus}
                            </Badge></Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>{adminOrderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payer-Id</p>
                        <Label>{adminOrderDetails?.payerId}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{adminOrderDetails?.paymentStatus}</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {/* <li className="flex justify-between items-center">
                                <span className="">Product One</span>
                                <span className="">$400</span></li> */}

                            {
                                adminOrderDetails?.cartItems.map((item, idx) => (
                                    <li className="grid grid-cols-3" key={idx}>
                                        <span className="">{item?.title}</span>
                                        <span className="">{item?.price}</span>
                                        <span className="">{item?.quantity}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-gray-500">
                            <span>Name : John Doe</span>
                            <span>Address : {adminOrderDetails?.addressInfo[0]?.address}</span>
                            <span>City : {adminOrderDetails?.addressInfo[0]?.city}</span>
                            <span>Pincode : {adminOrderDetails?.addressInfo[0]?.pincode}</span>
                            <span>Phone : {adminOrderDetails?.addressInfo[0]?.phone}</span>
                        </div>
                    </div>
                </div>

                <CommonForm formControls={[{
                    label: "Order Status",
                    name: "status",
                    componenttype: "select",
                    options: [
                        { id: "pending", label: "Pending" },
                        { id: "inProcess", label: "In Process" },
                        { id: "inShipping", label: "In Shipping" },
                        { id: "delivered", label: "Delivered" },
                        { id: "rejected", label: "Rejected" },
                    ]
                }]}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={'Update Order Status'}
                    onSubmit={(e) => {
                        handleUpdateStatus(e, adminOrderDetails?._id, formData.status)
                    }}
                />
            </div>
        </DialogContent>
    </>
}


export default AdminOrderDetailsView