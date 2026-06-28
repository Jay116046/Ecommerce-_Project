import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import banner3 from '../../assets/images/banner3.jpg'
import Address from './Address'
import ShoppingOrders from './Orders'

function Shop_Account() {
    return (
        <>
            <div className="relative h-[350px] w-full overflow-hidden">
                <img
                    // width={'1600'}
                    // height={'300'}
                    // style={{ aspectRatio:"1600/300" , objectFit:"cover"}}
                    src={banner3}
                    className='h-full w-full object-cover object-center'
                />

            </div>
            <div className="flex flex-col p-2">
                <div className="container mx-auto grid grid-cols-1 gap-8 py-6">
                    <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                        <Tabs defaultValue="orders" className="w-full flex-col " >
                            <TabsList className="bg-slate-50">
                                <TabsTrigger value="orders"  >Orders</TabsTrigger>
                                <TabsTrigger value="address" >Address</TabsTrigger>
                            </TabsList>
                            <TabsContent value="orders">
                                <ShoppingOrders />
                            </TabsContent>
                            <TabsContent value="address">
                                <Address />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Shop_Account