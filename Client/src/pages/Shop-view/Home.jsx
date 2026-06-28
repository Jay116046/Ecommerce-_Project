import { Button } from '@/Components/ui/button';
import bannerOne from '../../assets/images/banner1.jpg'
import bannerTwo from '../../assets/images/banner2.jpg'
import bannerThree from '../../assets/images/banner3.jpg'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { brandWithIcon, categoriesWithIcon } from '@/config';
import { Card, CardContent } from '@/Components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredProducts, getProductDetails, setProductDetails } from '@/store/shop/Products-Slice';
import ShoppingProductTile from './Product-tile';
import { addToCart, fetchCartDetails } from '@/store/shop/cart-slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProductDetailsDialog from '@/Components/shopping-view/ProductDetails';
import { getFeatures } from '@/store/common/featureSlice';


function Shop_Home() {
    const disPatch = useDispatch();
    const { productList, productDetails } = useSelector(state => state.shopProducts);
    const { user } = useSelector(state => state.auth);
    const { featuresList } = useSelector(state => state.feature);


    const slides = [bannerOne, bannerTwo, bannerThree];
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        disPatch(getFeatures());
    }, [])

    let len = featuresList.length > 0 ? featuresList.length : slides.length ;
    console.log(len,featuresList);
    

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const handleDialogClose = () => {
        setOpenDetailsDialog(false);
        disPatch(setProductDetails());
    }

    useEffect(() => {
        if (productDetails != null) {
            setOpenDetailsDialog(true)
        }
    }, [productDetails])

    const handleNavigate = (getCurrentItem, section) => {
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section]: [getCurrentItem]
        };

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate('/shop/listing');
    }

    useEffect(() => {

        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % len);
        }, 4000)

        return () => clearInterval(timer)

    }, [])

    useEffect(() => {
        disPatch(fetchFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }))
    }, [disPatch])

    // add to cart
    const handleAddtoCart = (getProductId) => {
        disPatch(addToCart({ userId: user?.id, productId: getProductId, quantity: 1 })).then((res) => {
            if (res?.payload?.status) {
                disPatch(fetchCartDetails(user?.id))
                toast.info("add item to cart")
            }
        })
    }

    const handlegetProductDetails = (id) => {
        disPatch(getProductDetails({ id }))
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="relative w-full h-[600px] overflow-hidden">
                    {
                        featuresList && featuresList.length>0 ? featuresList.map((slide, idx) => (
                            <img
                                key={idx}
                                src={slide?.image}
                                alt={idx}
                                className={`${idx === currentSlide ? 'opacity-100' : 'opacity-0'}
                                    absolute top-0 left-0 w-full h-full object-cover transition-opacity ducation-1000`} />
                        )) : slides.map((slide, idx) => (
                            <img
                                key={idx}
                                src={slide}
                                alt={idx}
                                className={`${idx === currentSlide ? 'opacity-100' : 'opacity-0'}
                                    absolute top-0 left-0 w-full h-full object-cover transition-opacity ducation-1000`} />
                        ))
                    }
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => { setCurrentSlide((prev) => ((prev - 1 + len) % len)) }}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white" >
                        <ChevronLeftIcon className='w-4 h-4 text-white' />
                    </Button>

                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => { setCurrentSlide((prev) => ((prev + 1) % len)) }}
                        className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white '>
                        <ChevronRightIcon className='w-4 h-4 text-white' />
                    </Button>
                </div>
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            shop by Category
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {
                                categoriesWithIcon.map((category) => (
                                    <Card onClick={() => handleNavigate(category.id, "category")}
                                        className="cursor-pointer hover:shadow-lg transition-shadow border" key={category.id}>
                                        <CardContent className="flex flex-col items-center justify-center p-6 ">
                                            <category.icon className='w-12 h-12 text-black' />
                                            <span className='font-bold'>{category.label}</span>
                                        </CardContent>

                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </section>

                <section className="py-4 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8 ">
                            shop by Brand
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
                            {
                                brandWithIcon.map((brand) => (
                                    <Card onClick={() => handleNavigate(brand.id, "brand")}
                                        className="cursor-pointer hover:shadow-lg transition-shadow border" key={brand.id}>
                                        <CardContent className="flex flex-col items-center justify-center p-6 ">
                                            <brand.icon className='w-12 h-12 text-black' />
                                            <span className='font-bold'>{brand.label}</span>
                                        </CardContent>

                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="constainer mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Feature Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                productList && productList.length > 0 ?
                                    productList.map((item) => (
                                        <ShoppingProductTile
                                            product={item} key={item._id}
                                            handleAddtoCart={handleAddtoCart}
                                            handlegetProductDetails={handlegetProductDetails}
                                        />
                                    )) : null
                            }
                        </div>
                    </div>
                    <ProductDetailsDialog productDetails={productDetails} open={openDetailsDialog} setOpen={handleDialogClose} />
                </section>
            </div>
        </>
    )
}


export default Shop_Home