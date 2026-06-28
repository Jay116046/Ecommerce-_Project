import CommonForm from "@/Components/common/Form"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { addressFormControls } from "@/config";
import { addAddress, fetchAllAddress, updateAddress } from "@/store/shop/address-slice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AddressCard from "./AddressCard";


const initialAddressFormData = {
    address: '',
    city: '',
    pinCode: '',
    phone: '',
    notes: ''
}

function Address({setcurrentSelectAddress,selectedId}) {

    const [formData, setFormData] = useState(initialAddressFormData);
    const disPatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const [editAddressId, setEditAddressId] = useState(null);



    const onSubmit = (e) => {
        e.preventDefault();

        if(addressList.length >2 && editAddressId===null){
            setFormData(initialAddressFormData)
            toast.error('you can add max 3 address')
            return
        }

        if(editAddressId===null){
            disPatch(addAddress({
            ...formData,
            userId: user?.id
        })).then((res) => {
            // console.log(res?.payload?.success);

            if (res?.payload?.success) {
                disPatch(fetchAllAddress(user?.id));
                setFormData(initialAddressFormData);
                toast.info('address successfully add');
            }
        })
        }
        else{
            disPatch(updateAddress({ userId:user?.id, addressId:editAddressId, formData:formData })).then((res)=>{
                    if(res?.payload?.success){
                        toast.info("address successfully edited")
                        setEditAddressId(null);
                        disPatch(fetchAllAddress(user?.id));
                        setFormData(initialAddressFormData);
                    }
            })
        }
    }


    useEffect(() => {
        disPatch(fetchAllAddress(user?.id));
    }, [disPatch])

    const isFormValid = () => {
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((item) => item)
    }

    const handleEditAddress = (getEditAddress) => {
        setEditAddressId(getEditAddress?._id);

        setFormData({
            ...formData,
            address: getEditAddress?.address,
            city:  getEditAddress?.city,
            pinCode:  getEditAddress?.pinCode,
            phone:  getEditAddress?.phone,
            notes:  getEditAddress?.notes
        })
    }

    return <>
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                {
                    addressList && addressList.length > 0 ?
                        addressList.map((addressInfo, idx) => (
                            <AddressCard
                                setcurrentSelectAddress={setcurrentSelectAddress}
                                addressInfo={addressInfo}
                                key={idx}
                                handleEditAddress={handleEditAddress}
                                selectedId={selectedId}
                            />
                        )) : null
                }
            </div>
            <CardHeader className="">
                <CardTitle>
                    {
                        editAddressId===null ? <span>Add new Address</span> : <span>Edit Address</span>
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                    buttonText={editAddressId===null ? 'Add new Address' : 'Edit Address'}
                    isBtnDisabled={isFormValid() ? false : true}
                />
            </CardContent>

        </Card>
    </>
}


export default Address