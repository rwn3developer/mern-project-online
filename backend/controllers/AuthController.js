const { hashPassword } = require('../helpers/authHelper');

const userModel = require('../models/userModel');

const register = async(req,res) => {
   try{ 
        const {name,email,password,phone,sport,role} = req.body;

        console.log(sport);
        
        if(!name){
            return res.send({error : "Name is Required"});
        }
        if(!email){
            return res.send({error : "Email is Required"});
        }
        if(!phone){
            return res.send({error : "Phone is Required"});
        }
        if(!password){
            return res.send({error : "Password is Required"}); 
        }
        if(!sport){
            return res.send({error : "Password is Required"}); 
        }

        const existuser = await userModel.findOne({email});
        if(existuser){
            return res.send({
                success : true,
                messege : "User is Already exist"
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await userModel.create({ 
            name : name,
            email : email,
            password : hashedPassword, 
            phone : phone,
            answer : sport,
            role :0
        })
        if(user){
            res.send({
                success : true,
                messege : "User Successfully Register",
                user
            })
        }else{
            res.send({
                success : false,
                messege : "User not Successfully Register",
            })
        }
   }catch(err){
        res.send({
            success : false,
            messege : "something wrong",
            err
        })
   }
}

const forgotpassword = async(req,res) => {
    try{
        const {email,answer,newpassword} = req.body;
        if(!email){
            return res.send({error : "Email is Required"});
        }
        if(!answer){
            return res.send({error : "answe is Required"});
        }
        if(!newpassword){
            return res.send({error : "Name is Required"});
        }
        const user = await userModel.findOne({email,answer});
        if(!user){
            return res.json({
                success : false,
                messege : "wrong email"
            })
        }
        const hashed = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id,{password : hashed})
        res.json({
            success : true,
            messege : "Password successfully create"
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

//profile update
const updateProfile = async(req,res) => {
    try{
        const {name,email,password,phone} = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if(!password ||  password.length < 6){
            return res.status(500).send({
                success : false,
                messege : "Password is required and 6 character long"
            })
        }
        const hashedPassword = await password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name : name || user.name,
            password : password || user.password,
            phone : phone || user.phone
        })
        return res.status(200).send({
            success : true,
            messege : "Profile successfully updated"
        })
    }catch(err){
        res.send({
            success : false,
            messege : "error in update profile",
            err
        })
    }
}

module.exports = {
    register,
    forgotpassword,
    updateProfile
}