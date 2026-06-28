import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchResult, searchProducts } from "@/store/shop/search-slice";
import ShoppingProductTile from "@/pages/Shop-view/Product-tile";
import { addToCart, fetchCartDetails } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { getProductDetails, setProductDetails } from "@/store/shop/Products-Slice";
import ProductDetailsDialog from "./ProductDetails";

function SearchProducts() {

    const [keyword, setkeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const disPatch = useDispatch();
    const { searchProductsList } = useSelector((state) => state.shopSearch);
    const { productDetails } = useSelector((state) => state.shopProducts);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)



    const handlegetProductDetails = (id) => {
        disPatch(getProductDetails({ id }))
    }

    // console.log(keyword);

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                disPatch(searchProducts({ keyword }))
            }, 1000)
        }
        else {
            disPatch(resetSearchResult());
        }
    }, [keyword])

    const handleAddtoCart = (getProductId, getTotalStock) => {

        // console.log(getTotalStock,getProductId,cartItems);

        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId);

            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast.warning(`only ${getQuantity} qantity add for this product`);
                    return;
                }
            }
        }

        disPatch(addToCart({ userId: user.id, productId: getProductId, quantity: 1 })).then((res) => {
            if (res?.payload?.status) {
                disPatch(fetchCartDetails(user?.id))
                toast.info("add item to cart")
            }
        })
    }

    const handleDialogClose = () => {
        setOpenDetailsDialog(false);
        disPatch(setProductDetails());
    }

    useEffect(() => {
        if (productDetails != null) {
            setOpenDetailsDialog(true)
        }
    }, [productDetails])

    // console.log(searchProductsList);
    return (
        <>
            <div className="container mx-auto md:px-6 px-4 py-8 ">
                <div className="flex justify-center mt-8">
                    <div className="w-full flex items-center">
                        <Input className="py-5" placeholder="Search Products...."
                            value={keyword}
                            onChange={(e) => { setkeyword(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        searchProductsList && searchProductsList.length > 0 ?
                            searchProductsList.map((item) => (
                                <ShoppingProductTile key={item._id} product={item} handleAddtoCart={handleAddtoCart} handlegetProductDetails={handlegetProductDetails} />
                            )) : <h1 className="text-3xl font-extrabold ">Item not found</h1>
                    }
                </div>
                <ProductDetailsDialog productDetails={productDetails} open={openDetailsDialog} setOpen={handleDialogClose} />
            </div>
        </>
    )
}

export default SearchProducts