import { useEffect, useState } from "react";
import ProductImageUpload from "./ProductImageUpload";
import { Button } from "@/Components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addFeature, deleteFeatures, getFeatures } from "@/store/common/featureSlice";
import { toast } from "sonner";

function DashBoard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const disPatch = useDispatch();
    const {featuresList} = useSelector(state=>state.feature);

    // console.log(uploadImageUrl);

    useEffect(()=>{
        disPatch(getFeatures());
    },[disPatch])

    // console.log(featuresList);

    const handleUpload = ()=>{
        if(uploadImageUrl!==""){
            disPatch(addFeature({image:uploadImageUrl})).then((data)=>{
                // console.log(data.payload.success);
                if(data.payload.success){
                toast.info("image add successfully");
                disPatch(getFeatures());
                setUploadImageUrl("");
                setImageFile(null);
                }
            })
        }
        else{
            toast.info("please add feature image");
        }
    }

    const handleDelete = (id)=>{
        // console.log(id);
        disPatch(deleteFeatures(id)).then((res)=>{
            // console.log(res);
            if(res.payload.success){
                toast.info("delete feture success fully")
                disPatch(getFeatures())
            }
        })

    }

    return (
        <div className="flex justify-center items-center flex-col">
            {/* <h1>
                Upload Feature Images
            </h1> */}
            <ProductImageUpload 
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadImageUrl={uploadImageUrl}
                setUploadImageUrl={setUploadImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                // isEditedMode={currentEditedId !== null}
            />
            <Button className="mt-5 bg-black text-white font-medium w-fit text-xl p-[1.5rem]" onClick={handleUpload}>
                Upload Image
            </Button>
            <div className="flex flex-col gap-4 mt-5">
                {
                    featuresList && featuresList.length>0 ?
                    featuresList.map((item)=>(
                        <div className="relative" key={item?._id}>
                            <img
                            className="w-full h-[300px] object-cover rounded-lg" 
                            src={item?.image} 
                            alt="" />
                            <Button className="absolute top-1 right-1 bg-white text-black font-bold" onClick={()=>handleDelete(item?._id)}>Delete</Button>
                        </div>
                    )): <h1>no feature found</h1>
                }
            </div>
        </div>
    )
}

export default DashBoard