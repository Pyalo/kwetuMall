import  express  from "express";
import productModel from '../models/productModel.js';
import multer from 'multer';
import fs from 'fs'


const router = express.Router();

// getting all products from database
router.get('/', async (req, res) =>{ 
    try {
        const products = await productModel.find();
        res.send({
            message: 'Fetched products successfully!',
            data: products
        })
    } catch (error) { 
        console.log(error); 
    }
    
});
// getting one product
router.get('/:id', async (req, res) =>{ 
    try {
        const product = await productModel.findOne({_id: req.params.id});
        res.send({
            message: 'Fetched products successfully!',
            data: product
        });
    } catch (error) {
        console.log(error); 
        res.send({
            message: 'Failed',
        });
    }
}); 
const upload = multer({dest: 'uploads/'});
const uploadProductImages =upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'images', maxCount: 4}
])

router.post('/create', uploadProductImages, async (req, res) => {
    try {
        // uploading  one image
    console.log(req.files.image[0]); 
    let img = req.files.image[0];
    let fileType = (img.mimetype).split('/')[1]; 
    let newFileName = img.filename+ '.'+ fileType;
    fs.rename(`./uploads/${img.filename}`, `./uploads/${newFileName}`, ()=>{
        console.log('File renamed successfully!'); 
    }) 

        // uploading multiple images
    let multipleImages = req.files.images;
    let imagesArray = multipleImages.map((image) =>{
        let mFileType = (image.mimetype).split('/')[1];
        let mNewFileName = image.filename+ '.'+ mFileType;
        fs.rename(`./uploads/${image.filename}`, `./uploads/${mNewFileName}`, ()=>{
            console.log('File renamed successfully!');
        });
        return mNewFileName
    });

    // saving to db
    const newProduct = new productModel ({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        mainImage: newFileName,
        images: imagesArray,
        category: req.body.category,
        discountPercentage: req.body.discountPercentage
    });
    let result = await newProduct.save();
    res.send({
        message: 'Product added successfully!',
        data: result 
    });
    
    } catch (error) {
        console.log(error)
        res.send({
            message: 'Failed',
            error: error.message 
        });
    }
});
router.post('/delete/:id', async (req, res)=>{
    try {
        await productModel.deleteOne({_id: req.params.id})
        res.send('Deleted successfully') 
    } catch (error) {
        console.log(error)
    }
}); 
router.post('delete/all', async (req, res)=>{
    try {
        await productModel.deleteMany({_id: ''})
        res.send('Deleted all successfully') 
    } catch (error) {
        console.log(error)
        res.send({
            message: 'Failed to delete',
            error: error.message 
        });
    }   
})  
 
export default router;