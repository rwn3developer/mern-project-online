import React from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useSearch } from '../context/Search'

const Search = () => {
    const [values, setValues] = useSearch();
    console.log(values);
    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>

                <div className='container'>
                    <div className='col-lg-12'>
                        <h1>Search Results</h1>
                        <h6>
                            {
                                values?.results.length < 1 ? "No Products Found" : `Found ${values.results.length}`
                            }
                        </h6>
                    </div>

                    <div className='row p-4'>
                        {
                            values.results.map((val) => {
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


                                                <button className='w-100 btn btn-primary btn-sm'>More Details</button>
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

export default Search