import { Airplay, BabyIcon, CloudLightning, Heater, Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from "lucide-react"

export const registrationFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'enter your user name',
        componenttype: 'input',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'enter your user email',
        componenttype: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'User Password',
        placeholder: 'enter your user password',
        componenttype: 'input',
        type: 'password'
    }
]

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'enter your user email',
        componenttype: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'User Password',
        placeholder: 'enter your user password',
        componenttype: 'input',
        type: 'password'
    }
]


export const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
]

export const  brandWithIcon = [
            { id: "nike", label: "Nike",icon:Shirt },
            { id: "adidas", label: "Adidas",icon:WashingMachine },
            { id: "puma", label: "Puma",icon:ShoppingBasket },
            { id: "zara", label: "Zara",icon:Airplay },
            { id: "h&m", label: "H&M",icon:Images },
            { id: "levi", label: "Levi's",icon:Heater }
        ]

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componenttype: "input",
        type: "text",
        placeholder: "Enter Product Title"
    },
    {
        label: "Description",
        name: "description",
        componenttype: "textarea",
        placeholder: "Enter Product Description"
    },
    {
        label: "Category",
        name: "category",
        componenttype: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ]
    },
    {
        label: "Brand",
        name: "brand",
        componenttype: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
            { id: "levi", label: "Levi's" }
        ]
    },
    {
        label: "Price",
        name: "price",
        componenttype: "input",
        type: "number",
        placeholder: "Enter Product Price"
    }, {
        label: "Sale Price",
        name: "salePrice",
        componenttype: "input",
        type: "number",
        placeholder: "Enter Sale Price(optional)"
    }, {
        label: "Total Stock",
        name: "totalStock",
        componenttype: "input",
        type: "number",
        placeholder: "Enter total stock"
    }
]



export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label: "Home",
        path: "/shop/home",
    },
    {
        id: "products",
        label: "Products",
        path: "/shop/listing",
    },
    {
        id: "men",
        label: "Men",
        path: "/shop/listing",
    },
    {
        id: "women",
        label: "Women",
        path: "/shop/listing",
    },
    {
        id: "kids",
        label: "Kids",
        path: "/shop/listing",
    },
    {
        id: "footewear",
        label: "Footwear",
        path: "/shop/listing",
    },
    {
        id: "accessories",
        label: "Accessories",
        path: "/shop/listing",
    },
    {
        id: "search",
        label: "Search",
        path: "/shop/search",
    }    
]

export const ShortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" }
]


export const categoryOptions = {
    "men": "Men",
    "women": "Women",
    "kids": "Kids",
    "accessories": "Accessories",
    "footwear": "Footwear",
}

export const brandOptions = {
    "nike": "Nike",
    "adidas": "Adidas",
    "puma": "Puma",
    "zara": "Zara",
    "h&m": "H&M",
    "levi": "Levi's"
}

export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],
    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
        { id: "levi", label: "Levi's" }
    ]
}


export const addressFormControls = [
    {   
        name:"address",
        label: 'Address',
        placeholder: 'enter your address',
        componenttype: 'input',
        type: 'text'
    },
    {   
        name:"city",
        label: 'City',
        placeholder: 'enter your city',
        componenttype: 'input',
        type: 'text'
    }
    ,{   
        name:"pinCode",
        label: 'PinCode',
        placeholder: 'enter your pinCode',
        componenttype: 'input',
        type: 'text'
    },
    {   
        name:"phone",
        label: 'Phone',
        placeholder: 'enter your phone no.',
        componenttype: 'input',
        type: 'text'
    },
    {   
        name:"notes",
        label: 'Notes',
        placeholder: 'enter your any additional notes',
        componenttype: 'textarea',
    }
]