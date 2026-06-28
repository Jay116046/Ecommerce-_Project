import ProductFilter from "@/Components/shopping-view/Filter"
import { Button } from "@/Components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { ShortOptions } from "@/config"
import { ArrowUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShoppingProductTile from "./Product-tile"
import { fetchFilteredProducts, getProductDetails, setProductDetails } from "@/store/shop/Products-Slice"
import { useSearchParams } from "react-router-dom"
import ProductDetailsDialog from "@/Components/shopping-view/ProductDetails"
import { addToCart, fetchCartDetails } from "@/store/shop/cart-slice"
import { toast } from "sonner"

const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }

    }
    // console.log(filterParams);
    return queryParams.join("&")
}

function Shop_Listing() {
    const [selectSortType, setSelectSortType] = useState("price-lowtohigh")
    const [filters, setFilter] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const { productDetails, productList } = useSelector((state) => state.shopProducts);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const disPatch = useDispatch();
    const { cartItems } = useSelector(state => state.shopCart)


    const categorySearchParams = searchParams.get("category");

    const handlegetProductDetails = (id) => {
        disPatch(getProductDetails({ id }))
    }

    //  filter

    const handleFilter = (getSectionId, getCurrentOption) => {
        console.log(getSectionId, getCurrentOption);

        let cpyFilters = { ...filters };

        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
        // console.log(indexOfCurrentSection);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        }
        else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1) {
                cpyFilters[getSectionId].push(getCurrentOption);
            }
            else {
                cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
            }

        }
        setFilter(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters))
    }

    useEffect(() => {
        setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
    }, [categorySearchParams])

    useEffect(() => {
        if (productDetails != null) {
            setOpenDetailsDialog(true)
        }
    }, [productDetails])

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {

            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));

        }
    }, [filters])

    // fetch list of products

    useEffect(() => {
        if (filters != null && selectSortType != null) {
            disPatch(fetchFilteredProducts({ filterParams: filters, sortParams: selectSortType }))
        }
    }, [disPatch, filters, selectSortType])


    // add to cart
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

    // handleDialogClose

    const handleDialogClose = () => {
        setOpenDetailsDialog(false);
        disPatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
    }

    return (
        <>
            <div className="grid grid-cols-1  md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
                <ProductFilter filters={filters} handleFilter={handleFilter} />
                <div className="bg-slate-50 w-full rounded-lg shadow-sm p-2">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-extrabold">
                            All Products
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-500">{productList.length}</span>
                            <div className="">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                                            <ArrowUpDown className="h-4 w-4" />
                                            <span className="">Short by</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px] bg-white">
                                        <DropdownMenuRadioGroup value={selectSortType} onValueChange={setSelectSortType} >
                                            {
                                                ShortOptions.map((option) => (

                                                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                                                        {option.label}
                                                    </DropdownMenuRadioItem>
                                                ))
                                            }
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            productList && productList.length > 0 &&
                            productList.map((item) => (
                                <ShoppingProductTile product={item} key={item._id}
                                    handleAddtoCart={handleAddtoCart}
                                    handlegetProductDetails={handlegetProductDetails} />
                            ))
                        }
                    </div>
                </div>
                <ProductDetailsDialog productDetails={productDetails} open={openDetailsDialog} setOpen={handleDialogClose} />
            </div>
        </>
    )
}


export default Shop_Listing