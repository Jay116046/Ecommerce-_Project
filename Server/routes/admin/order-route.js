import express from "express"
import { getAllOrdersByAllUser, getOrderDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/order-controller.js";

const AdminOrderRouter = express.Router();

AdminOrderRouter.get('/get',getAllOrdersByAllUser);
AdminOrderRouter.get('/details/:id',getOrderDetailsForAdmin);
AdminOrderRouter.post('/update/:id',updateOrderStatus);

export default AdminOrderRouter  