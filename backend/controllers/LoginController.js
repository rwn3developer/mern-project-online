const JWT = require('jsonwebtoken');

const userModel = require('../models/userModel');

const { comparePassword } = require("../helpers/authHelper");

const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.send({ 
                success : false, 
                messege : "Invalid Username or Password"
            })
        }
        //checkUser
        const user = await userModel.findOne({email});
        if(!user){
            return res.send({
                success : false,
                messege : "User not found"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.send({
                success : false,
                messege : "Invalid password"
            })
        }
        //token create
        const token = await JWT.sign({_id : user.id},process.env.JWT_SECRET,{expiresIn : '1hr'});
        return res.json({
            success : true,
            messege : "Login successfully",
            user : {
                name : user.name,
                email : user.email,
                password : user.password,
                address : user.address,
                phone : user.phone,
                role : user.role
            },
            token,
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const test = (req,res) => {
    res.send("protected routes")
}

module.exports = {
    login, 
    test
}