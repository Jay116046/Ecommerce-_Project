import express from "express"
import { getFilteredProducts, getProductDetails } from "../../controllers/shop/products-controller.js";


const shopProductRouter =  express.Router();

shopProductRouter.get("/getProducts",getFilteredProducts);
shopProductRouter.get("/getproducts/:id",getProductDetails);

export default shopProductRouter