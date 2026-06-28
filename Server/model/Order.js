import mongoose from "mongoose";


const OrderSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    cartId: String,
    cartItems: [{
        productId:String,
        title: String,
        image: String,
        price: String,
        salePrice: String,
        quantity: Number
    }],
    addressInfo: [{
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    }],
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: String,
    orderDate: String,
    orderUpdateDate: String,
    paymentId: String,
    payerId: String
})


const Order = mongoose.model('Order', OrderSchema)

export default Order
