import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog } from "@/Components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { useEffect, useState } from "react"
import AdminOrderDetailsView from "./AdminOrderDetails"
import { useDispatch, useSelector } from "react-redux"
import { getOrderByAllUser, getOrderDetailsforAdmin, resetAdminOrderDetails} from "@/store/admin/order-slice"
import { Badge } from "@/Components/ui/badge"

function AdminOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const disPatch = useDispatch();
    const { orderList ,orderDetails} = useSelector(state => state.adminOrder);

    useEffect(() => {
        disPatch(getOrderByAllUser())
    }, [disPatch])


    const handleShowOrderDetails = (id)=>{
        setOpenDetailsDialog(true);
        disPatch(getOrderDetailsforAdmin(id));
    }

    return <>
        <Card>
            <CardHeader>
                <CardTitle>
                    All Orders
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order State</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">
                                    Details
                                </span>
                            </TableHead>


                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            orderList && orderList.length > 0 ?

                                orderList.map((order) => (

                                    <TableRow key={order?._id}>
                                        <TableCell>{order?._id}</TableCell>
                                        <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                                        <TableCell>
                                            <Badge className={`${order?.orderStatus=="rejected" ? "bg-red-600":order?.orderStatus == 'confirmed'|| order?.orderStatus =="delivered" ? "bg-green-400"  : "bg-black"} text-white rounded-md p-2`}>
                                               {order?.orderStatus} 
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{order?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog 
                                            open={openDetailsDialog} 
                                            onOpenChange={()=>{
                                                setOpenDetailsDialog(false);
                                                disPatch(resetAdminOrderDetails());
                                            }}
                                            >
                                                <Button onClick={() =>
                                                     handleShowOrderDetails(order?._id)
                                                     } 
                                                     className="text-white bg-black">
                                                    Show Details
                                                </Button>
                                                <AdminOrderDetailsView adminOrderDetails={orderDetails} />
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>

                                ))
                                : null

                        }


                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </>
}


export default AdminOrders
