import mongooes from "mongoose"


const addressSchema =new mongooes.Schema({
    userId:String,
    address:String,
    city:String,
    pinCode:String,
    phone:String,
    notes:String
},
{
    timestamps:true
}
)


const Address = mongooes.model('Address',addressSchema);

export default Address