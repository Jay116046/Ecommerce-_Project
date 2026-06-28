import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Label } from "@/Components/ui/label"
import { addAddress, deleteAddress, fetchAllAddress } from "@/store/shop/address-slice";
import { useDispatch } from "react-redux"
import { toast } from "sonner";

function AddressCard({ addressInfo, handleEditAddress, setcurrentSelectAddress,selectedId }) {
    const disPatch = useDispatch();


    const handleDeleteAddress = () => {
        disPatch(deleteAddress({ userId: addressInfo?.userId, addressId: addressInfo?._id })).then((res) => {
            if (res?.payload?.success) {
                toast.info('address successfully deleted');
                disPatch(fetchAllAddress(addressInfo?.userId));
            }
        })
    }

return <>
    <Card onClick={
        setcurrentSelectAddress ? ()=>setcurrentSelectAddress(addressInfo) : null } 
    className={`border min-w-full hover:cursor-pointer ${selectedId===addressInfo?._id ? 'border-[3px] border-red-600':''} `} >
        <CardContent className="p-2 space-y-2">
            <Label>Address : {addressInfo?.address}</Label>
            <Label>City : {addressInfo?.city}</Label>
            <Label>PinCode : {addressInfo?.pinCode}</Label>
            <Label>Phone : {addressInfo?.phone}</Label>
            <Label>Notes : {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className=" p-2 flext justify-between">
            <Button onClick={() => handleEditAddress(addressInfo)}
                className="bg-black text-white font-medium">Edit</Button>

            <Button onClick={() => handleDeleteAddress()}
                className="bg-black text-white font-medium">Delete</Button>
        </CardFooter>
    </Card>
</>
}


export default AddressCard