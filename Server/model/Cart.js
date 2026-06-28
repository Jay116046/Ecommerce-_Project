import mongooes from "mongoose"
import Product from "./Product.js"

const CartSchema = new mongooes.Schema({
    userId: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: mongooes.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ]
},
{
    timestamps:true
})


const CartModel = mongooes.model('CartModel',CartSchema)

export default CartModel