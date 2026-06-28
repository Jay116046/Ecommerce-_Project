import express from "express"
import { addToCart, deleteCart, fetchCartDetails, upadateCartItemQty } from "../../controllers/shop/cart-controller.js";

const cartRouter = express.Router();

cartRouter.post('/addToCart',addToCart);
cartRouter.get('/getCartItems/:userId',fetchCartDetails);
cartRouter.put('/upadateCart',upadateCartItemQty);
cartRouter.delete('/deleteCart/:userId/:productId',deleteCart)


export default cartRouter