import CommonForm from "@/Components/common/Form";
import { loginFormControls } from "@/config";
import { login } from "@/store/authSlice";
// import { formToJSON } from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";

const initialState = {
    email: '',
    password: ''
}

function Login() {
    const [formData, setFormData] = useState(initialState);
    const disPatch = useDispatch();


    const onSubmit = (event) => {
        event.preventDefault();

        disPatch(login(formData)).then((data)=>{
            // console.log(data.payload.message);
            if(data?.payload?.success) {
                toast.info(data?.payload?.message)
                // navigate('/')
            }
            else{
                toast.warning(data?.payload?.message)
            }
            
        })

    }

    return (
        <>
            <div className="mx-auto w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Login
                    </h1>
                    <p className="mt-2">
                        Register account?
                        <Link to='/auth/register' className="font-medium text-primary hover:underline ml-2">register</Link>
                    </p>
                </div>

                <CommonForm
                    formData={formData}
                    setFormData={setFormData}
                    formControls={loginFormControls}
                    buttonText={'Login'}
                    onSubmit={onSubmit}
                />

            </div>
        </>
    )
}

export default Login