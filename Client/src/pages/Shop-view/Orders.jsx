import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Dialog, DialogTitle } from "@/Components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import ShoppingOrdersDetailsView from "./ShopOrderDetails"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrderByUserId, getOrderDetailsById, resetOrderDetails } from "@/store/shop/order-slice"
import { Badge } from "@/Components/ui/badge"

function ShoppingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { orderList, orderDetails } = useSelector(state => state.shopOrder)
    const disPatch = useDispatch();    

    useEffect(() => {
        disPatch(getOrderByUserId(user?.id));
    }, [disPatch])

    // console.log(orderList,user);

    const handleShowDetails = (id) => {
        setOpenDetailsDialog(true)
        disPatch(getOrderDetailsById(id))
    }

    return <>
        <Card>
            <CardHeader>
                <CardTitle>
                    Shopping Orders
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
                                    <TableRow key={order._id}>
                                        <TableCell>{order?._id}</TableCell>
                                        <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                                        <TableCell>
                                             <Badge className={`${order?.orderStatus=="rejected" ? "bg-red-600":order?.orderStatus == 'confirmed'|| order?.orderStatus =="delivered" ? "bg-green-400"  : "bg-black"} text-white rounded-md p-2`}>
                                               {order?.orderStatus} 
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{order?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog open={openDetailsDialog}
                                                onOpenChange={() => {
                                                    setOpenDetailsDialog(false)
                                                    disPatch(resetOrderDetails)
                                                }}>

                                                <DialogTitle>
                                                    <Button onClick={() => handleShowDetails(order._id)} className="text-white bg-black">
                                                        Show Details
                                                    </Button>
                                                </DialogTitle>
                                                <ShoppingOrdersDetailsView orderDetails={orderDetails}  userName={user?.userName}/>
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


export default ShoppingOrders