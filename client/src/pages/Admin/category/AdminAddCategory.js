import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../../components/Layout/Header'
import Footer from '../../../components/Layout/Footer'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const AdminAddCategory = () => {

  const [category,setCategory] = useState("");

  const handleSubmit = async() => {
        if(!category){
          toast.error("Category is required");
          return false;
        }

        let categorydata = await axios.post(`http://localhost:8080/category/create-category`,{
          name : category
        })
        if(categorydata){
          toast.success("Category successfully add");
          setCategory("");
        }else{
          toast.error(categorydata.messegge);
          return false;
        }
  }

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
                <h5 className='text-center'>Category Add</h5>

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

export default AdminAddCategory