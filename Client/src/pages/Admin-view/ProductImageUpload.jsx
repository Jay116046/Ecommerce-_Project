import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Skeleton } from "@/Components/ui/skeleton";
import axios from "axios";
import { File, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react"


function ProductImageUpload({ imageFile, setImageFile,imageLoadingState, uploadImageUrl, setUploadImageUrl,setImageLoadingState,isEditedMode }) {
    const inputRef = useRef(); 


    const handleImageFileChange = (e) => {
        // console.log(e.target.files);
        const selectedFile = e.target.files?.[0];

        if (selectedFile) { setImageFile(selectedFile) }
    }

    const handleDragOver = (event)=>{
            event.preventDefault();
    }

    const handleDrop = (event)=>{
        event.preventDefault();

        const droppedFile = event.dataTransfer.files?.[0]
        if(droppedFile) {setImageFile(droppedFile)}

    }

    const handleRemoveImage = ()=>{
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = ''
        }
    }

    const uploadImageToCloudinary =async ()=>{
        setImageLoadingState(true);

        const data = new FormData();

        data.append("my_file",imageFile)

        const response = await axios.post(`http://localhost:5173/api/admin/product/upload-image`,data)

        if (response?.data?.success){
            // console.log(response.data.result.url);
            setUploadImageUrl(response.data.result.url)
            setImageLoadingState(false)
        }
        
    }

    useEffect(()=>{
        // console.log(imageFile);
        
        if(imageFile){
            uploadImageToCloudinary()
        }
    },[imageFile])

    return (<>

        <div className="w-[90%] max-w-md mx-auto">
            <Label className='text-lg mb-2 block font-semibold'>Upload Image</Label>
           <div onDragOver={handleDragOver} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg ${isEditedMode? 'opacity-60' :''}`}>

             <Input
                id='image-upload'
                type='file'
                className='hidden'
                ref={inputRef}
                onChange={handleImageFileChange}
                disabled={isEditedMode}
                />
                
            {
                !imageFile ?
                    <Label
                        htmlFor='image-upload'
                        className={`${isEditedMode ? 'cursor-not-allowed':''}flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-zinc-400 mb-2" />
                        <span>Drag & drop  or click to upload image</span>
                    </Label>

                    :
                    imageLoadingState ? <Skeleton className='h-10 bg-gray-200' /> :
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <File className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant="ghost" size="icon"  className="" onClick={handleRemoveImage} >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
            }

           </div>
        </div>

    </>)
}

export default ProductImageUpload


