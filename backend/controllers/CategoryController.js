const categoryModel = require('../models/CategoryModel');
const slugify = require('slugify');
const createCategory = async(req,res) => {
    try{
        const {name} = req.body;
        if(!name){
            res.json({messege : "Name is Required"});
        }
        const exist = await categoryModel.findOne({name});
        if(exist){
            return res.json({
                success : true,
                messege : "Category Already Exisits"
            })
        }
        const category = categoryModel.create({
            name : name,
            slug : slugify(name)
        })
        if(category){
            return res.json({
                success : true,
                messege : "Category successfully add",
                category
            })
        }else{
            return res.json({
                success : false,
                messege : "Category not add"
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            err,
            messege : "Category Error"
        })
    }
}

const category = async(req,res) => {
    try{
        const categoryr = await categoryModel.find({});
        if(categoryr){
            return res.json({
                success : true,
                messege : "all category  list",
                categoryr
            })
        }else{
            return res.json({
                success : false,
                messege : "something wrong"
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            err,
            messege : "Category Error"
        })
    }
}

//single category

const singleCategory = async(req,res) => {
    try{
       console.log(req.params.slug);
        const category = await categoryModel.findOne({slug : req.params.slug});
        if(category){
            return res.json({
                success : true,
                messege : "Get Single Category",
                category
            })
        }else{
            return res.json({
                success : false,
                messege : "Not fetch sinngle category",
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            err,
            messege : "Category Error"
        })
    }
}

const deleteCategory = async(req,res) => {
    try{
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        if(category){
            return res.json({
                success : true,
                messege : "Category delete",
            })
        }else{
            return res.json({
                success : false,
                messege : "something wrong",
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            err,
            messege : "Category Error"
        })
    }
}

const updateCategory = async(req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{
            name : name,
            slug : slugify(name)
        })
        if(category){
            return res.json({
                success : true,
                messege : "Category successfully update",
                category
            })
        }else{
            return res.json({
                success : false,
                messege : "Category not update"
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            err,
            messege : "Category Error"
        })
    }
}

module.exports = {
    createCategory,
    category,
    singleCategory,
    deleteCategory,
    updateCategory
}