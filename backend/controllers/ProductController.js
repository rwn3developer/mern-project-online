const productModel = require('../models/ProductModel');
const slugify = require('slugify');
const fs = require('fs');
const formidable = require('formidable');

//create product
const createProduct = async(req, res) => {
    try {
        const { name, description, price, category, qty, shipping } =
          req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !qty:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
    
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
          success: true,
          message: "Product Created Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in crearing product",
        });
      }
}

//product get all
const getproduct = async (req, res) => {
    try {
        let products = await productModel.find({}).populate('category').limit(10).sort({ createdAt: -1 });
        if (products) {
            res.json({
                success: true,
                countTotal: products.length,
                messege: "all product",
                products,

            })
        } else {
            res.json({
                success: false,
                messege: "something wrong"
            })
        }
    } catch (err) {
        res.json({
            success: false,
            err,
            messege: err
        })
    }
}

const singleProduct = async (req, res) => {
    try {
        const productSingle = await productModel.findOne({ slug: req.params.slug }).populate('category')
        if (productSingle) {
            res.json({
                success: true,
                messege: "single product fetch",
                productSingle,
            })
        } else {
            res.json({
                success: false,
                messege: "something wrong",
            })
        }
    } catch (err) {
        res.json({
            success: false,
            err,
            messege: err
        })
    }
}

//product delete
const deleteProduct = async (req, res) => {
    try {
            
            let productDelete = await productModel.findByIdAndDelete(req.params.id);
                res.json({
                    success: true,
                    messege: "product successfully delete",
                })
    } catch (err) {
        res.json({
            success: false,
            err,
            messege: err
        })
    }
}

//fetch image in product table
const singlePhoto = async(req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
          res.set("Content-type", product.photo.contentType);
          return res.status(200).send(product.photo.data);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr while getting photo",
          error,
        });
      }
}
//fetch image in product table

//product update
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, qty, shipping } =
          req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !qty:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res
              .status(500)
              .send({ error: "photo is Required and should be less then 1mb" });
        }
    
        const products = await productModel.findByIdAndUpdate(
          req.params.id,
          { ...req.fields, slug: slugify(name) },
          { new: true }
        );
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
          success: true,
          message: "Product Updated Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Updte product",
        });
      }
}


//filter product
const productfilter = async(req,res) => {
    try{
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const products = await productModel.find(args);
      
      res.json({
        success: true,
        products,
      });
    }catch(err){
      res.status(500).send({
        success: false,
        err,
        message: "Error in Filter",
      });
    }
} 
//search product
const searchProduct = async(req,res) => {
  try{
    let keyword = req.params.keyword;
    const results = await productModel.find({
      $or : [
        {name : {$regex : keyword, $options : "i"}},
        {description : {$regex : keyword, $options : "i"}},
      ]
    })
    res.json(results);
  }catch(err){
    res.status(500).send({
      success: false,
      err,
      message: "Error in Filter",
    });
  }
}

//similar product
const similarproduct = async(req,res) =>{
    try{
        const {pid,cid} = req.params;
        console.log(`PID :- ${pid}`)
        console.log(cid)
        const products = await productModel.find({
          category:cid,
          _id:{$ne:pid}
        }).limit(3).populate("category") 
        res.status(200).send({
          success : true,
          products
        })
    }catch(err){
      res.status(500).send({
        success: false,
        err,
        message: "Error in Similar Product", 
      });
    }
}

module.exports = {
    createProduct,
    getproduct,
    singleProduct,
    deleteProduct,
    updateProduct,
    singlePhoto,
    productfilter,
    searchProduct,
    similarproduct
}
