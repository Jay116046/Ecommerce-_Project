import CommonForm from "@/Components/common/Form"
import { Button } from "@/Components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/Components/ui/sheet"
import { addProductFormElements } from "@/config"
import { Fragment, useEffect, useState } from "react"
import ProductImageUpload from "./ProductImageUpload"
import { addNewProduct, editProduct, fetchAllProducts, deleteProduct } from "@/store/admin/Product-slice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";
import AdminProducts from "./Product-tile"



const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: "",
    salePrice: '',
    totalStock: ''
}

function Products() {
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
    const [formData, setFormData] = useState(initialFormData)

    const [imageFile, setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState("");

    const [imageLoadingState, setImageLoadingState] = useState(false)
    const { productList } = useSelector(state => state.adminProducts)
    const disPatch = useDispatch();

    const [currentEditedId, setCurrentEditedId] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        currentEditedId !== null ?
            disPatch(editProduct({ id: currentEditedId, formData })).then((data) => {
                if (data?.payload?.success) {
                    disPatch(fetchAllProducts());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast.info('product edited successfully')
                }
            })
            :
            disPatch(addNewProduct({ ...formData, image: uploadImageUrl })).then((data) => {
                if (data?.payload?.success) {
                    disPatch(fetchAllProducts());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast.info('product add successfully')
                }
            })
    }

    const isFormValid = () => {
        return Object.keys(formData).map((key) => formData[key] !== "").every((item) => item);
    }
    const handleDelete = (productId) => {
        // console.log(productId);
        disPatch(deleteProduct(productId)).then((res) => {
            disPatch(fetchAllProducts());
            toast.info('product deleted successfully')
        })
    }

    useEffect(() => {
        disPatch(fetchAllProducts());
    }, [disPatch])

    console.log(productList);

    return (
        <>
            <Fragment>
                <div className="flex  mb-5 w-full justify-end ">
                    <Button onClick={() => setOpenCreateProductDialog(true)} className='bg-black text-white'>
                        Add product
                    </Button>

                </div>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {
                        productList && productList.length > 0
                            ? productList.map((product, idx) => (
                                <AdminProducts
                                    key={idx}
                                    setFormData={setFormData}
                                    setOpenCreateProductDialog={setOpenCreateProductDialog}
                                    setCurrentEditedId={setCurrentEditedId}
                                    product={product}
                                    handleDelete={handleDelete}
                                />
                            ))
                            : null
                    }
                </div>

                <Sheet open={openCreateProductDialog} onOpenChange={() => {
                    setOpenCreateProductDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData)
                }}>

                    <SheetContent side="right" className="overflow-auto bg-slate-300">


                        <SheetTitle className="p-2 text-xl font-bold text-center">Add new Product </SheetTitle>

                        <ProductImageUpload

                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadImageUrl={uploadImageUrl}
                            setUploadImageUrl={setUploadImageUrl}
                            setImageLoadingState={setImageLoadingState}
                            imageLoadingState={imageLoadingState}
                            isEditedMode={currentEditedId !== null}
                        />

                        <div className="p-5">
                            <CommonForm
                                formControls={addProductFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={onSubmit}
                                buttonText={currentEditedId == null ? 'ADD' : 'Edit'}
                                isBtnDisabled={!isFormValid()}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </Fragment>
        </>
    )
}

export default Products