const express = require('express');

const routes = express.Router();


const authcontroller = require('../controllers/AuthController');
const logincontroller = require('../controllers/LoginController');
const {requireSignIn} = require('../middlewares/authMiddleware');
const {isAdmin} = require('../middlewares/authMiddleware');
routes.post('/register',authcontroller.register);

//LOGIN POST

routes.post('/login',logincontroller.login);

routes.get('/test',requireSignIn,isAdmin,logincontroller.test);

//protected route by user
routes.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok : true});
})

//protected route by admin
routes.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok : true});
})

routes.post('/forgot-password',authcontroller.forgotpassword);

routes.put('/update-profile',requireSignIn,authcontroller.updateProfile);

module.exports = routes;