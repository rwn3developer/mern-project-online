const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireSignIn = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        if (!token) {
            return res.json({ message: 'Token is Blank' });
        }
        // const finalToken = token.slice(7);

        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({ message: 'Token is not valid' });
            }
            req.user = decoded; // Store user data in the request object
            next();
        });
    } catch (err) {
        console.log(err);
    }
}

const isAdmin = async(req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.json({
                success : false,
                messege : "Unauthorized access"
            })
        }
        next();
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    requireSignIn,isAdmin
}