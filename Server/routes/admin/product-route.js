import express from 'express'
import { addProduct, deleteProduct, getProducts, handleImageUpload, updateProduct } from '../../controllers/admin/products-controller.js';
import { upload } from '../../helpers/cloudinary.js';

const router = express.Router();

router.post('/upload-image',upload.single("my_file"),handleImageUpload)


router.post('/add-product',addProduct)
router.get('/get-products',getProducts)
router.put('/update-product/:id',updateProduct)
router.delete('/delete-product/:id',deleteProduct)

export default router 