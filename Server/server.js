import dotenv from "dotenv"

dotenv.config();

import express from "express"
import connect_db from "./connect.database.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth/auth-routes.js";
import router  from "./routes/admin/product-route.js";
import shopProductRouter from "./routes/shop/products-route.js";
import cartRouter from "./routes/shop/cart-route.js";
import addressRouter from "./routes/shop/address-route.js";
import shopOrderRouter from "./routes/shop/order-route.js";
import AdminOrderRouter from "./routes/admin/order-route.js";
import searchProductRouter from "./routes/shop/search-route.js";
import ReviewRoute from "./routes/shop/product-review-route.js";
import featureRoute from "./routes/common/feature-route.js";


const app = express();

connect_db();

app.use(cors(
    {
        origin:process.env.CLIENT_ORIGIN,
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true

    }
))

app.use(cookieParser('CLIENT_SECRET_KEY'));
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/admin/product',router);
app.use('/api/admin/orders',AdminOrderRouter);
app.use('/api/shop/products',shopProductRouter);
app.use('/api/cart',cartRouter);
app.use('/api/shop/address',addressRouter);
app.use('/api/shop/order',shopOrderRouter);
app.use('/api/shop/search',searchProductRouter);
app.use('/api/shop/review',ReviewRoute);


app.use('/api/common/feature',featureRoute);

app.listen(process.env.PORT);