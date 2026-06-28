import CommonForm from "@/Components/common/Form"
import { registrationFormControls } from "@/config"
import { register } from "@/store/authSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"


const initialState = {
    userName:'',
    email:'',
    password:''
}

function Register() {
    const [formData,setFormData]=useState(initialState)

    const disPatch = useDispatch();
    const navigate = useNavigate();
    

    const onSubmit = (event)=>{
        event.preventDefault();
        console.log(formData);

        disPatch(register(formData)).then((data)=>{
            console.log(data.payload.message);
            if(data?.payload?.success) {
                toast.info(data.payload.message)
                navigate('/auth/login')

            }
            else{
                toast.warning(data?.payload?.message)
                
            }
        })

    }

    // console.log(formData);
    

    return(
        <>
           <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new Account
                </h1>
                <p className="mt-2">
                    Already have an account? 
                    <Link to='/auth/login' className="font-medium text-primary hover:underline ml-2">login</Link>
                </p>
            </div>
            <CommonForm 
                formControls={registrationFormControls}
                formData={formData}
                buttonText={'Sign up'}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
           </div>
        </>
    )
}

export default Register