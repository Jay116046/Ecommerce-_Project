import FeatureModel from "../../model/Feature.js";

export const addFeature = async (req, res) => {
    try {

        const {image} = req.body;
        // console.log(image);
    
        const featureImages = new FeatureModel({image});

        await featureImages.save();

        res.status(200).json({
            success:true,
            data:featureImages
        })

    } catch (err) {
        console.log(err);
        
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}


export const getFeature = async (req, res) => {
    try {
        const images =await FeatureModel.find({});        

        res.status(200).json({
            success:true,
            data:images
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}