import { Button } from "@/Components/ui/button"
import { Card, CardHeader, CardTitle } from "@/Components/ui/card"
import { useNavigate } from "react-router-dom"

function PaymentSuccess(){

    const navigate = useNavigate();

    return<>
        <Card className="p-10">
            <CardHeader className="p-0">
                <CardTitle className="text-4xl">
                    payment successfully done!
                </CardTitle>
            </CardHeader>
            <Button className="mt-5 bg-black text-white font-medium w-fit text-xl p-[1.5rem]" onClick={()=>navigate("/shop/account")}>
                check Orders
            </Button>
        </Card>
    </>
}

export default PaymentSuccess