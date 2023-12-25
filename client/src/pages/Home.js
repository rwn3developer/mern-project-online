import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useAuth } from '../context/Auth'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox, Radio } from 'antd'
import { price } from '../components/Layout/Price'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  const [auth, settAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);


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


  const getAllProduct = async () => {
    try {
      let allproduct = await axios.get(`http://localhost:8080/product/get-product`);
      if (allproduct) {

        setProducts(allproduct.data.products);
      } else {
        toast.error(allproduct.data.messege);
      }
    } catch (err) {
      toast.error("something wrong");
      return false;
    }
  }


  //category wise filter 
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all)
  }

  const filterProduct = async() => {
    try{
      const {data} = await axios.post(`http://localhost:8080/product/product-filter`,{
        checked,radio
      })
      setProducts(data?.products)
      console.log(products);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(checked.length || radio.length) filterProduct()
  }, [checked,radio])

  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProduct() 
  },[])

  useEffect(()=>{
    getCategory();
  },[])

  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <div className='row p-4'>
          <div className='col-lg-3'>
           
            <div className='d-flex flex-column'>
            <h4>Filter By Category</h4>
              {

                categories.map((val) => {
                  return (
                    <Checkbox key={val._id} onChange={(e) => handleFilter(e.target.checked, val._id)}>
                      {val.name}
                    </Checkbox>
                  )
                })
              }
            </div>

           
            <div className='d-flex flex-column mt-4'>
            <h4>Filter By Price</h4>
              <Radio.Group onChange={e => setRadio(e.target.value)} >
                {
                  price.map(p =>
                    (
                      <div key={p._id}>
                         <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ) 
                  )
                }
              </Radio.Group>
              <button onClick={ () => window.location.reload() } className='mt-3 w-50 btn btn-success'>Reset Filter</button>
            </div>
          </div>
          <div className='col-lg-9'>
            <h3>Products</h3>
            <div className='row p-4'>
              {
                products.map((val) => {
                  return (
                    <div className='col-lg-4 pb-5'>
                      <div className="card p-3 mb-4" style={{ width: '20rem' }}>
                        {/* <img src="" className="card-img-top" alt="..." /> */}
                        <img src={`http://localhost:8080/product/single-photo/${val._id}`} className="card-img-top" style={{
                          height
                            : "250px", objectFit: "cover"
                        }} />
                        <div className="card-body">
                          
                          <h6 className="card-title p-0 m-0 text-center">{val.name}</h6>
                          
                          <p className='mt-2 card-title text-center'>$ {val.price}</p>
                          <p className='mt-2 card-title text-center'>{val.description}</p>

                         
                          <button onClick={ () => navigate(`/product/${val.slug}`) } className='w-100 btn btn-primary btn-sm'>More Details</button>
                          <button className='mt-3 w-100 btn btn-success btn-sm'>Add Cart</button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home