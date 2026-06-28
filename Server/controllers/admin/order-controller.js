import Order from "../../model/Order.js";


const getAllOrdersByAllUser = async(req,res,next)=>{
    try{

        const order = await Order.find({});

        // console.log(order);

        if(!order){
            return res.status(400).json({
                success:false,
                msg:'order not found'
            })
        }

        res.status(200).json({
            success:true,
            data:order
        })

    }catch (error) {
        // console.log("error",error)
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}

const getOrderDetailsForAdmin = async(req,res,next)=>{
    try{

        const {id} = req.params;

        const order = await Order.findById(id);

        if(!order){
            return res.status(400).json({
                success:false,
                msg:'order not found'
            })
        }

        res.status(200).json({
            success:true,
            data:order
        })

    }catch (error) {
        console.log("error",error)
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
}


const updateOrderStatus = async (req,res) => {

    try{

        const {id} = req.params;
        const {status} = req.body;

        const order = await Order.findById(id);

        if(!order){
            return res.status(400).json({
                success:false,
                msg:'order not found'
            })
        }
        // console.log(orderStatus,id);

        await Order.findByIdAndUpdate(id,{orderStatus:status});

        res.status(200).json({
            success:true,
            msg:"order successfully updated"
        })

    }catch(error){
        console.log("error",error)
        res.status(500).json({
            success: false,
            msg: "some error occured!!"
        })
    }
} 

export {getAllOrdersByAllUser,getOrderDetailsForAdmin,updateOrderStatus}
