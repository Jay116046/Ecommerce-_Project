import mongooes from 'mongoose'


const ProductSchema = new mongooes.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salePrice:Number,
    totalStock:Number
},{timestamps:true})


const Product = mongooes.model('Product',ProductSchema)

// module.exports = mongoose.model('Product', ProductSchema);


export default Product