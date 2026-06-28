import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";

function PaypalReturn() {

    const disPatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');


    useEffect(()=>{

        const orderId = JSON.parse(sessionStorage.getItem('CurrentOrderId'));

        disPatch(capturePayment({paymentId, payerId, orderId })).then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                sessionStorage.removeItem("CurrentOrderId");
                window.location.href = "/shop/payment-success";
            }
        })

    },[payerId,paymentId,disPatch])
    
    
    return <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        processing payment...... please wait
                    </CardTitle>
                </CardHeader>
            </Card>
    </>
}

export default PaypalReturn