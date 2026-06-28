import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../model/Product.js";

export const handleImageUpload = async (req, res) => {
    console.log(req.file.buffer);

    if (!req.file) {
        res.json({
            success: false,
            messege: "no image provided"
        })
    }

    try {

        const result = await imageUploadUtil(req.file.buffer);

        // console.log(result);

        res.status(200).json({
            success: true,
            message: "successfully add",
            result
        })

    } catch (err) {
        console.log(err);

        res.json({
            success: false,
            message: "error"
        })

    }
}



// add new product
export const addProduct = async (req, res) => {

    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock } = req.body;

        const newlyAddProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        })

        await newlyAddProduct.save()

        res.status(201).json({
            success: true,
            messege: "product successfully add",
            newlyAddProduct
        })

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            messege: "error"
        })
    }
}

// fetch all product
export const getProducts = async (req, res) => {

    try {

        const getProducts = await Product.find({})

        res.status(200).json({
            success: true,
            messege: "get products successfully ",
            data:getProducts
        })

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            messege: "error"
        })
    }
}

// edit product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id,req.params,"object id is this");
        
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock } = req.body;

        const findProduct = await Product.findById(id);
        // console.log(findProduct);
        

        if (!findProduct) {
            res.status(404).json({
                success: true,
                messege: "product not found"
            })
        }

        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price==='' ? 0 : price || findProduct.price
        findProduct.salePrice = salePrice==='' ? 0 :salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock

        findProduct.save();

        res.status(200).json({
            success: true,
            messege: "product successfully update",
            findProduct
        })

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            messege: "error"
        })
    }
}

// delete product
export const deleteProduct =async (req, res) => {

    try {
        const { id } = req.params;

        const result = await Product.findByIdAndDelete({_id:id});

        if (!result) {
            res.status(404).json({
                success: true,
                messege: "product is not found"
            })
        }



        res.status(200).json({
            success: true,
            messege: "product successfully deleted"
        })

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            messege: "error"
        })
    }
}