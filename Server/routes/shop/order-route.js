import express from "express"
import { captureOrder, createOrder, getAllOrdersByUser, getOrderDetails } from "../../controllers/shop/order-controller.js";

const shopOrderRouter = express.Router();

shopOrderRouter.post('/create', createOrder);
shopOrderRouter.post('/capture', captureOrder);
shopOrderRouter.get('/list/:userId', getAllOrdersByUser);
shopOrderRouter.post('/details/:id', getOrderDetails);


export default shopOrderRouter  