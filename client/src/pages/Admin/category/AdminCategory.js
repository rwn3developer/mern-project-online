import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import Header from '../../../components/Layout/Header'
import Footer from '../../../components/Layout/Footer'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminCategory = () => {

  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      let record = await axios.get(`http://localhost:8080/category/get-category`);
      if (record) {
        setCategory(record.data.categoryr);
      } else {
        toast.error(record.messege)
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const deleteData = async (id) => {
    try {
      let record = await axios.delete(`http://localhost:8080/category/delete-category/${id}`);
      if (record) {
        toast.error(record.data.messege);
        getCategory();
      } else {
        toast.error(record.messege)
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }


  useEffect(() => {
    getCategory();
  }, [])

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
                <div className='d-flex justify-content-end'>
                  <NavLink to={`/dashboard/admin/addcategory`}>
                    <button className='btn btn-success btn-sm'>Add</button>
                  </NavLink>
                </div>
                <table class="table table-hover">
                  <thead className='thead-dark'>
                    <tr>
                      <th scope="col">Sr no.</th>
                      <th scope="col">Category</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      category.map((val, i) => {
                        i = i + 1
                        return (
                          <tr>
                            <td scope="row">{i}</td>
                            <td>{val.name}</td>
                            <td>
                              <button onClick={() => deleteData(val._id)} className='btn btn-danger btn-sm'>Delete</button>
                              <NavLink to={`/dashboard/admin/editcategory/${val.slug}`}>
                                <button className='btn btn-primary btn-sm ms-1'>Edit</button>
                              </NavLink>

                            </td>
                          </tr>
                        )
                      })
                    }


                  </tbody>
                </table>
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

export default AdminCategory