import mongoose from "mongoose";


const Feature = new mongoose.Schema({
    image:String,
},{
    timestamps:true
})

const FeatureModel = mongoose.model('FeatureModel',Feature);

export default FeatureModel