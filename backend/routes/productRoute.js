const express = require('express');

const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

const routes = express.Router();

const formidable = require('express-formidable');

const productcontroller = require('../controllers/ProductController');



routes.post('/create-product',requireSignIn,isAdmin,formidable(),productcontroller.createProduct);
routes.get('/get-product',productcontroller.getproduct);

//single category get
routes.get('/single-product/:slug',productcontroller.singleProduct);

routes.get('/single-photo/:pid',productcontroller.singlePhoto); 

routes.delete('/delete-product/:id',requireSignIn,isAdmin,productcontroller.deleteProduct);

routes.put('/update-product/:id',requireSignIn,isAdmin,formidable(),productcontroller.updateProduct);


routes.post('/product-filter',productcontroller.productfilter);

//search product
routes.get('/search-product/:keyword',productcontroller.searchProduct);

// similar product
routes.get('/similar-product/:pid/:cid',productcontroller.similarproduct);


//category wise product
routes.get('/product-category/:slug',productcontroller.categoryWiseProduct);


module.exports = routes;