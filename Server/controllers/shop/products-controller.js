import Product from "../../model/Product.js";

export const getFilteredProducts =async (req,res)=>{


    const {category=[] ,brand=[],sortBy="price-lowtohigh"} = req.query ;

    let filters = {};

    if(category.length){
        filters.category = {$in:category.split(",")}
    }
    if(brand.length){
        filters.brand = {$in:brand.split(",")}
    }

    let sort = {};

    switch (sortBy) {
        case "price-lowtohigh":
            sort.price=1 
            break;
        case"price-hightolow":
            sort.price=-1 
            break;
        case"title-atoz":
            sort.title=1
            break;
        case"title-ztoa":
            sort.title=-1
            break;
        default:
            sort.price=1
            break;
    }


    try{
        const products =  await Product.find(filters).sort(sort);
        res.status(200).json({
            success: true,
            messege: "get products successfully ",
            data:products
        })

    }catch(e){
        console.log(e);
        res.status(500).json({messege:"some err",status:false})
    }
}



export const getProductDetails =async (req,res)=>{

    const {id} = req.params;

    const product = await Product.findById(id);

    if(!product){
        res.status(404).json({
            status:false,
            messege:"product not found"
        })
    }

    res.status(200).json({
        status:true,
        messege:"success",
        data:product
    })

}