import express from 'express'
import { authmiddleware, login, logout, register } from '../../controllers/auth/auth-controller.js';


const authRouter = express.Router();

authRouter.get('/authcheck',authmiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"Authentication success",
        user
    })
})
authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',logout)




export default authRouter