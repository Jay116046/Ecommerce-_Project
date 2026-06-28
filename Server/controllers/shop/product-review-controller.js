import Order from "../../model/Order.js";
import Product from "../../model/Product.js";
import ReviewModel from "../../model/Review.js";



export const addProductReview = async(req,res)=>{
    try{

        const {productId,userId,userName,reviewMessage,reviewValue} = req.body;
        

        const order = await Order.findOne({
            userId,
            "cartItems.productId":productId,
            orderStatus:'confirmed'
        })

        if(!order){
            return res.status(403).json({
                success:false,
                message:"you need to purchase product to review it."
            })
        }

        const checkExistingReview = await ReviewModel.findOne({productId,userId});
        
        if(checkExistingReview){
            return res.status(400).json({success:false,msg:"you already review this product"})
        }

        const newReview = new ReviewModel({
            productId,userId,userName,reviewMessage,reviewValue
        })


        await newReview.save();


        const reviews = await ReviewModel.find({productId});
        const totalReviewLength = reviews.length;
        const avgReviews = reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0) / totalReviewLength ;

        
        await Product.findByIdAndUpdate(productId,{avgReviews});

        res.status(200).json({
            success:true,
            data:newReview
        })

    }catch(e){
        console.log(e);
        
        req.status(500).json({
            success:false,
            msg:"some error"
        })
    }
}


export const getProductReviews = async(req,res)=>{
    try{

        const {productId} = req.params;
        // console.log(productId);

        const reviews = await ReviewModel.find({productId});

        // console.log(reviews);

        res.status(200).json({
            success:true,
            data:reviews
        })

    }catch(e){
        console.log(e);
        
        req.status(500).json({
            success:false,
            messege:"some error"
        })
    }
}