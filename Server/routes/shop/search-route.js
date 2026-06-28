import express from "express"
import { searchProducts } from "../../controllers/shop/search-controller.js";


const searchProductRouter =  express.Router();

searchProductRouter.get('/:keyword',searchProducts);

export default searchProductRouter