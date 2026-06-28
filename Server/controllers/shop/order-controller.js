import paypal from "../../helpers/paypal.js";
import CartModel from "../../model/Cart.js";
import Order from "../../model/Order.js";
import Product from "../../model/Product.js";


const createOrder = async (req, res, next) => {
    try {

        const {
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        } = req.body;


        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_ORIGIN}/shop/paypal-return`,
                cancel_url: `${process.env.CLIENT_ORIGIN}/shop/paypal-cancle`
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: "description"

                }
            ]
        }

        // console.log("cartItems:",cartItems);
        


        paypal.payment.create(create_payment_json, async (err, paymentInfo) => {
            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    msg: "some error while creating paypal payment"
                })
            }
            else {
                // console.log("cartItems:",cartItems);

                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId
                })

                // console.log("newly created order & cartItems",newlyCreatedOrder,cartItems);
                

                await newlyCreatedOrder.save();

                const approvalUrl = paymentInfo.links.find(link => link.rel === "approval_url").href;

                res.status(201).json({
                    success: true,
                    approvalUrl,
                    orderId: newlyCreatedOrder._id
                })
            }

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}


const captureOrder = async (req, res, next) => {
    try {

        const { paymentId, payerId, orderId } = req.body;

        let order = await Order.findById(orderId);

        // console.log(order);

        if (!order) {
            return res.status(404).json({
                success: false,
                msg: "order can not be found"
            })
        }

        order.paymentStatus = "paid";
        order.orderStatus = "pending";
        order.payerId = paymentId;
        order.payerId = payerId;
        
        
        for (let item of order.cartItems) {
            
            let product = await Product.findById(item?.productId);
    
            if (!product) {
                res.status(404).json({
                    success: false,
                    msg:`not enough stock for this product ${product?.title}`
                })
            }

            // console.log(product);

            product.totalStock -= item?.quantity;

            await product.save();
        }

        const getCartId = order.cartId;
        await CartModel.findByIdAndDelete(getCartId);
        await order.save();

        res.status(200).json({
            success: true,
            msg: "successfully done"
        })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}

const getAllOrdersByUser = async (req, res, next) => {
    try {

        const { userId } = req.params;

        const order = await Order.find({ userId });

        // console.log(order);


        if (!order) {
            return res.status(400).json({
                success: false,
                msg: 'order not found'
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}

const getOrderDetails = async (req, res, next) => {
    try {

        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(400).json({
                success: false,
                msg: 'order not found'
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}

export { createOrder, captureOrder, getAllOrdersByUser, getOrderDetails }