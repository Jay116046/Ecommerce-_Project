import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import shoppingProductSlice from './shop/Products-Slice/index.js'
import shoppingCartSlice from './shop/cart-slice/index.js'
import shopAddressSlice from './shop/address-slice/index.js'
import shoppingOrderSlice from "./shop/order-slice"
import adminOrderSlice from "./admin/order-slice"
import searchSlice from "./shop/search-slice"
import reviewSlice from "./shop/product-review-slice"
import adminProductSlice from "./admin/Product-slice"
import featureSlice from "./common/featureSlice"

const store = configureStore({
    reducer: { 
        auth: authReducer,
        adminProducts:adminProductSlice,
        adminOrder:adminOrderSlice,
        shopProducts: shoppingProductSlice, 
        shopCart: shoppingCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shoppingOrderSlice,
        shopSearch: searchSlice,
        shopReview: reviewSlice,
        feature:featureSlice
    }
});


export default store