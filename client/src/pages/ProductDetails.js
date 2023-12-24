import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
function ProductDetails() {
    const navigate = useNavigate();
    const params = useParams();

    const [product, setProduct] = useState({});

    const [similarProduct, setSimilarProduct] = useState([]);

    useEffect(() => {
        if (params.slug) getProduct();
    }, [params.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/product/single-product/${params.slug}`)
            setProduct(data.productSingle);
            similarProductData(data.productSingle._id, data.productSingle.category._id);
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const similarProductData = async (pid, cid) => {

        try {
            const { data } = await axios.get(`http://localhost:8080/product/similar-product/${pid}/${cid}`)
            console.log(data);
            setSimilarProduct(data.products)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>

                <div className='row container mt-5'>
                    <div className='col-md-6'>
                        <img src={`http://localhost:8080/product/single-photo/${product._id}`} className="card-img-top" style={{
                            height
                                : "300px", objectFit: "contain"
                        }} />
                    </div>
                    <div className='col-md-6 text-center'>
                        <h1>Product Details</h1>
                        <h6>Name :- {product.name}</h6>
                        <h6>Description :- {product.description}</h6>
                        <h6>Price :- {product.price}</h6>
                        <h6>Category :- {product.category?.name}</h6>

                        <button className='btn btn-success'>
                            ADD TO CART
                        </button>

                    </div>
                </div>

                <div className='row container mt-5'>
                    {
                        similarProduct.map((val) => {
                            return (
                                <div className='col-lg-3 pb-5'>
                                    <div className="card p-3 mb-4" style={{ width: '15rem' }}>
                                        {/* <img src="" className="card-img-top" alt="..." /> */}
                                        <img src={`http://localhost:8080/product/single-photo/${val._id}`} className="card-img-top" style={{
                                            height
                                                : "200px", objectFit: "cover"
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

            </main>
            <Footer />
        </>
    )
}

export default ProductDetails