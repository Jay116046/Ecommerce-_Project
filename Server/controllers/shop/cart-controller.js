import CartModel from "../../model/Cart.js";
import Product from "../../model/Product.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                stauts: false,
                messege: "incomplete details"
            })
        }

        const product = await Product.findById({ _id: productId })

        if (!product) {
            return res.status(404).json({
                stauts: false,
                messege: "Product not Found"
            })
        }

        let cart = await CartModel.findOne({ userId })

        if (!cart) {
            cart = new CartModel({ userId: userId, items: [] });
        }

        const findCurrentProductIdx = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        )


        if (findCurrentProductIdx === -1) {
            cart.items.push({ productId, quantity });
        }
        else {
            cart.items[findCurrentProductIdx].quantity += quantity;
        }

        await cart.save();

        res.status(200).json({
            status: true,
            messege: "successfully item add in cart"
        })


    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: false,
            messege: "something error",
            err
        })
    }
}

export const fetchCartDetails = async (req, res) => {
    try {

        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                stauts: false,
                messege: "incomplete details"
            })
        }

        const cart = await CartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice"
        });;

        if (!cart) {
            return res.status(404).json({
                stauts: false,
                messege: "cart not Found"
            })
        }


        const validItems = cart.items.filter((productItem) => productItem.productId);

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        // console.log("validateItem",validItems);


        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity
        }))

        // console.log(populateCartItems);
        
        

        res.status(200).json({
            status: true,
            data: {
                ...cart._doc,
                items:populateCartItems
            }
        })

    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: false,
            messege: "something error",
            err
        })
    }
}


export const upadateCartItemQty = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                stauts: false,
                messege: "incomplete details"
            })
        }

        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                stauts: false,
                messege: "cart not Found"
            })
        }

        const findCurrentProductIdx = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        )

        if (findCurrentProductIdx === -1) {
            return res.status(404).json({
                status: false,
                messege: "product not found"
            })
        }

        cart.items[findCurrentProductIdx].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        })

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }))

        res.status(200).json({
            status: true,
            data: {
                ...cart._doc,
                items:populateCartItems
            }
        })


    } catch (err) {
        res.status(500).json({
            status: false,
            messege: "something error"
        })
    }
}


export const deleteCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                stauts: false,
                messege: "incomplete details"
            })
        }

        const cart = await CartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice"
        })

        if (!cart) {
            return res.status(404).json({
                stauts: false,
                messege: "cart not Found"
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)

        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        })

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }))

        res.status(200).json({
            status: true,
            data: {
                ...cart._doc,
                items:populateCartItems
            }
        })


    } catch (err) {
        console.log(err);
        
        res.status(500).json({ 
            err,
            status: false,
            messege: "something error"
        })
    }
}