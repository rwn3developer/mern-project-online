const express = require('express');

const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

const routes = express.Router();

const categorycontroller = require('../controllers/CategoryController');

routes.post('/create-category',requireSignIn,isAdmin,categorycontroller.createCategory);
routes.get('/get-category',categorycontroller.category);

//single category get
routes.get('/single-category/:slug',categorycontroller.singleCategory);

routes.delete('/delete-category/:id',requireSignIn,isAdmin,categorycontroller.deleteCategory);

routes.put('/update-category/:id',requireSignIn,isAdmin,categorycontroller.updateCategory); 


module.exports = routes;