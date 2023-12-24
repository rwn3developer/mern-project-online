import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../../components/Layout/Header'
import Footer from '../../../components/Layout/Footer'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const AdminEditCategory = () => {

const {slug} = useParams();
const navigate = useNavigate();
  const [category,setCategory] = useState("");
  const [id,setId] = useState("");

  const editCategory = async() => {
    try{
        const edit = await axios.get(`http://localhost:8080/category/single-category/${slug}`);
        if(edit.data.success){
            setCategory(edit.data.category.name);
            setId(edit.data.category._id);
        }else{
          toast.error(edit.data.messegge);
          return false;
        }
    }catch(err){
        toast.error("something wrong");
        return false;
    }
  }

  const handleSubmit = async() => {
        if(!category){
          toast.error("Category is required");
          return false;
        }

        let categorydata = await axios.put(`http://localhost:8080/category/update-category/${id}`,{
          name : category
        })
        if(categorydata){
          toast.success(categorydata.data.messege);
          setCategory("");
          // navigate(`/dashboard/admin/category`);
        }else{
          toast.error(categorydata.messegge);
          return false;
        }
  }
  useEffect(()=>{
    editCategory();
  },[])
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
                <h5 className='text-center'>Category Edit</h5>

                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Category</label>
                    <input type="text" value={category} onChange={ (e) => setCategory(e.target.value) } className="form-control mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Category" />
                    
                  </div>
              
                  <button type="button" onClick={ () => handleSubmit() } className="btn btn-success btn-sm">Submit</button>
                  <NavLink to={`/dashboard/admin/category`}>
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

export default AdminEditCategory