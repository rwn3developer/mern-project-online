import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryWiseFilter = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getCategoryWiseProduct();
    }, [params.slug])

    const getCategoryWiseProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/product/product-category/${params.slug}`);
            setProducts(data?.product);
            setCategory(data?.category);
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <h4 className='text-center'>Category :- {category?.name}</h4>
                            <h6 className='text-center'>{products?.length} result found</h6>
                        </div>
                    </div>

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


                                                <button onClick={() => navigate(`/product/${val.slug}`)} className='w-100 btn btn-primary btn-sm'>More Details</button>
                                                <button className='mt-3 w-100 btn btn-success btn-sm'>Add Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
}

export default CategoryWiseFilter
