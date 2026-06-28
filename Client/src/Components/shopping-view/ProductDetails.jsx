import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { StarIcon } from "lucide-react"
import { Input } from "../ui/input"
import { addToCart, fetchCartDetails } from "@/store/shop/cart-slice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { Label } from "../ui/label"
import StarRatingComponent from "../common/StarRating"
import { useEffect, useState } from "react"
import { addReview, getReviews } from "@/store/shop/product-review-slice"

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const disPatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const [reviewMsg, setReviewMsg] = useState("")
    const [rating, setRating] = useState(0);
    const { reviews } = useSelector(state => state.shopReview);

    useEffect(() => {
        if (productDetails !== null) {
            disPatch(getReviews(productDetails?._id));
        }
    }, [productDetails])

    const handleRatingChange = (getRating) => {
        setRating(getRating);
    }

    console.log(reviews);

    const avgReviews = reviews && reviews.length > 0 ?
        reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 2;


    const handleAddReview = (productId) => {
        const reviewData = {
            "productId": productId,
            "userId": user?.id,
            "userName": user?.userName,
            "reviewMessage": reviewMsg,
            "reviewValue": rating,
        }

        disPatch(addReview(reviewData)).then((result) => {
            // console.log(result);
            if (result.payload?.success) {
                setRating(0);
                setReviewMsg("");
                toast.info("review add successfully");
                disPatch(getReviews(productId));
            }
            else {
                toast.message("you have to purchase this product");
            }
        })
    }

    const handleAddtoCart = (getProductId, getTotalStock) => {

        // console.log(cartItems);
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

        disPatch(addToCart({ userId: user?.id, productId: getProductId, quantity: 1 })).then((res) => {
            if (res?.payload?.status) {
                disPatch(fetchCartDetails(user?.id))
                toast.info("add item to cart")
            }
        })

    }


    return <>
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] lg:max-w-[70vw] bg-slate-100">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div className="">
                        <h1 className="text-3xl font-extrabold p-1">{productDetails?.title}</h1>
                        <p className="text-gray-700 p-1">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`${productDetails?.salePrice > 0 ? 'line-through' : ''} text-3xl font-bold text-primary `}>
                            ${productDetails?.price}
                        </p>
                        {
                            productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-gray-500 ">${productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className="flex items-center gap-0.5 mt-2">
                        {/* <StarIcon className="fill-black w-5 h-5" />
                        <StarIcon className="fill-black w-5 h-5" />
                        <StarIcon className="fill-black w-5 h-5" />
                        <StarIcon className="fill-black w-5 h-5" />
                        <StarIcon className="fill-black w-5 h-5" /> */}
                        {
                            [1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    className={`w-6 h-6 ${star <= avgReviews ? 'fill-yellow-500' : 'fill-black'}`}
                                />))
                        }
                        <span>({avgReviews})</span>
                    </div>

                    <div className="mt-5 mb-5">
                        {
                            productDetails?.totalStock === 0 ? <Button className="w-full bg-black text-white opacity-60 cursor-not-allowed">
                                Out of Stock
                            </Button> :
                                <Button onClick={() => { handleAddtoCart(productDetails?._id, productDetails?.totalStock) }} className="w-full text-xl p-2 h-10 bg-black text-white">
                                    Add to Cart
                                </Button>
                        }
                    </div>
                    <Separator className="bg-black h-[2px]" />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>

                        <div className="grid">

                            {
                                reviews && reviews.length > 0 ?
                                    reviews.map((review) => (
                                        <div>
                                            <div className="flex gap-4">
                                                <Avatar className="w-10 h-10 border">
                                                    <AvatarFallback >
                                                        {review?.userName.slice(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3>
                                                            {review?.userName}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-0.5 mt-2">
                                                {
                                                    [1, 2, 3, 4, 5].map((star) => (
                                                        <StarIcon
                                                            className={`w-6 h-6 ${star <= review?.reviewValue ? 'fill-yellow-500' : 'fill-black'}`}
                                                        />))
                                                }
                                            </div>
                                            <p className="text-gray-700">{review?.reviewMessage}</p>
                                        </div>
                                    )) : null


                            }
                            <div className="mt-10 flex flex-col gap-2">
                                <Label>
                                    Write a Review
                                </Label>
                                <div className="flex gap-2">
                                    <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
                                </div>
                                <Input name="reviewMsg" value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} placeholder="write a review" />
                                <Button
                                    onClick={() => handleAddReview(productDetails?._id)}
                                    disabled={reviewMsg.trim() === ""}
                                    className="text-white bg-black text-xl p-2 h-10">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </>
}

export default ProductDetailsDialog