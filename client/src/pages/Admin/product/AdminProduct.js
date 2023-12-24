import Header from '../../../components/Layout/Header'
import Footer from '../../../components/Layout/Footer'
import AdminMenu from '../../../components/Layout/AdminMenu'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProduct = () => {
  const [product, setProduct] = useState([]);


  const getAllProduct = async () => {
    try {
      let allproduct = await axios.get(`http://localhost:8080/product/get-product`);
      if (allproduct) {

        setProduct(allproduct.data.products);
      } else {
        toast.error(allproduct.data.messege);
      }
    } catch (err) {
      toast.error("something wrong");
      return false;
    }
  }

  const deleteData = async (id) => {
    try {
      alert(id)
      let deleteRecord = await axios.delete(`http://localhost:8080/product/delete-product/${id}`);
      if (deleteRecord.data.success) {
        toast.error("Product successfully delete");
        getAllProduct();
      }
    } catch (err) {
      toast.error("something wrong");
      return false;
    }
  }

  useEffect(() => {
    getAllProduct();
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
                <div className='d-flex justify-content-end'>
                  <NavLink to={`/dashboard/admin/addproduct`}>
                    <button className='btn btn-success btn-sm'>Add</button>
                  </NavLink>
                </div>
                <hr />
                <h4 className='text-center'>Product Details</h4>
                <hr />
                <div className='row p-4'>
                  {
                    product.map((val) => {
                      return (
                        <div className='col-lg-6 pb-5'>
                          <div className="card" style={{ width: '20rem',boxShadow : "1px 1px 10px 5px gray" }}>
                            {/* <img src="" className="card-img-top" alt="..." /> */}
                            <img src={`http://localhost:8080/product/single-photo/${val._id}`} className="card-img-top" style={{
                              height
                                : "200px", objectFit: "contain"
                            }} />
                           
                            <div className="card-body">
                            <hr/>
                              <h5 className="card-title p-0 m-0 text-center">Name :- {val.name}</h5>
                              <hr/>
                              <h5 className="card-title p-0 m-0 text-center">Price :- {val.price}</h5>
                              <hr/>
                              
                               <div className='row p-2 justify-content-between'>
                               <button onClick={ () => deleteData(val._id) } className='btn btn-danger btn-sm' style={{width : "120px"}}>
                                  Delete
                                </button>
                                
                                <button className='btn btn-success btn-sm' style={{width : "120px"}}>
                                  Active
                                </button>
                              </div>
                              <hr/>
                              <NavLink to={`/dashboard/admin/editproduct/${val.slug}`}>
                                <button className='btn btn-primary btn-sm w-100'>
                                    Edit
                                </button>
                              </NavLink>
                                

                                
                            </div>

                            

                           
                          </div>
                        </div>


                      )
                    })
                  }
                </div>
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

export default AdminProduct