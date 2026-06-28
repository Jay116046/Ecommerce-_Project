import express from "express"
import { addAddress, deleteAddress, fetchAllAddress, updateAddress } from "../../controllers/shop/address-controller.js";

const addressRouter = express.Router();

addressRouter.post('/add',addAddress);
addressRouter.get('/get/:userId',fetchAllAddress);
addressRouter.put('/update/:userId/:addressId',updateAddress);
addressRouter.delete('/delete/:userId/:addressId',deleteAddress);

export default addressRouter
