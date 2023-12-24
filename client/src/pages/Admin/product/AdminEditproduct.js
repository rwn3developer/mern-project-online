import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../../components/Layout/Header'
import Footer from '../../../components/Layout/Footer'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const AdminEditproduct = () => {
    const navigate = useNavigate();
    const {slug} = useParams(); 
    const [categories, setCategories] = useState([]);
    const [category,setCategory] = useState("");
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [qty,setQty] = useState("");
    const [shipping,setShipping] = useState("");
    const [photo,setPhoto] = useState("");

    const [single,setSingle] = useState({});
    const [id,setId] = useState("");

    const getSingleRecord = async() => {
        try {
            let singlerecord = await axios.get(`http://localhost:8080/product/single-product/${slug}`);
        
                
            setSingle(singlerecord.data.productSingle);
            setName(single.name)
            setDescription(single.description)
            setPrice(single.price)
            setQty(single.qty) 
            setShipping(single.shipping) 
            setCategory(single.category._id) 
           setId(single._id)
            
        } catch (err) {
            console.log(err);
            return false
        }
    }

    const getCategory = async () => {
        try {
            let record = await axios.get(`http://localhost:8080/category/get-category`);
            if (record) {
                setCategories(record.data.categoryr);
            } else {
                toast.error(record.messege)
            }
        } catch (err) {
            console.log(err); 
            return false;
        }
    }

    

    //create product
    const handleSubmit = async (e) => {
        try{
            const productData = new FormData();
            productData.append("name",name);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("qty",qty);
            photo && productData.append("photo",photo);
            productData.append("category",category);
            productData.append("shipping",shipping);



            const productInsert = await axios.put(`http://localhost:8080/product/update-product/${id}`,productData);
            if(productInsert.data.success){
                toast.success("Product successfully insert");
                navigate('/dashboard/admin/product');  
            }else{
                toast.error("Not Update");
            }
        }catch(err){
            console.log(err);
            toast.error("something wrong");
        }
    }

    useEffect(() => { 
        getSingleRecord()  
        getCategory();
    }, []);

    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                
                <div className='container-fluid m-3 p-3'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-lg-9'>
                            <div style={{ boxShadow: "1px 1px 10px 3px gray" }} className='w-75 p-4'>
                                <h5 className='text-center'>Product Edit</h5>

                                <form> 
                                    <div className="form-group mb-4">
                                        <select name='category' value={category}     onChange={ (e) => setCategory(e.target.value) } className='form-control'>
                                            <option>Select Category</option>
                                            {
                                                categories.map((val)=>{ 
                                                    return (
                                                        <option  selected value={val._id}>{val.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                        <div className="form-group mb-4">
                                            <input type='file' name='photo' className='form-control' accept='image/*' onChange={ (e) => setPhoto(e.target.files[0]) }/>
                                            <img src={`http://localhost:8080/product/single-photo/${single._id}`} width="100"/>
                                        </div>
                                        
                                        {/* image priview */}
                                        {/* <div>
                                            <img src={URL.createObjectURL(photo)} height={"200px"} alt='product_image' className='img img-responsive'/>
                                        </div> */}
                                        {/* image priview */}
                                    

                                    <div className="form-group mb-4">
                                        <input className='form-control' type='text' value={name} name='name' onChange={ (e) => setName(e.target.value) } placeholder='Enter product name'/>
                                    </div>

                                    <div className="form-group mb-4">
                                        <textarea className='form-control' type='text' name='description' value={description} onChange={ (e) => setDescription(e.target.value) } placeholder='Enter description'/>
                                    </div>

                                    <div className="form-group mb-4">
                                        <input className='form-control' type='number' name='price' value={price} onChange={ (e) => setPrice(e.target.value) } placeholder='Enter price'/>
                                    </div>

                                    <div className="form-group mb-4">
                                        <input className='form-control' type='number' name='qty' value={qty} onChange={ (e) => setQty(e.target.value) } placeholder='Enter qty'/>
                                    </div>

                                    

                                    <div className="form-group mb-4">
                                        <select name='shipping' value={shipping} onChange={ (e) => setShipping(e.target.value) } className='form-control'>
                                            
                                            <option>Select Shipping</option>  
                                    
                                                        <option value="false">No</option> 
                                                        <option value="true">Yes</option>
                                        </select>
                                    </div>

                                    <button type="button" onClick={() => handleSubmit()} className="btn btn-success btn-sm">Submit</button>
                                    <NavLink to={`/dashboard/admin/product`}>
                                        <button type="submit" className="btn btn-primary btn-sm ms-3">View Category</button>
                                    </NavLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </main>
            <Footer />
        </>
    )
}

export default AdminEditproduct