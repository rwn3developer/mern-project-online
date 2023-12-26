import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import useCategory from '../hook/useCategory'
import { Link } from 'react-router-dom'
const Categories = () => {

    const categories = useCategory();

  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <h1 className='text-center'>Category page</h1>
        <div className='container'>
            <div className='row mt-5'>
                {
                    categories.map((cat)=>{
                        return (
                            <div className='col-md-6' key={cat._id}>
                                <button className='btn btn-primary mb-3 w-25'>
                                    <Link className='text-white' to={`/category/${cat.slug}`}>
                                        {cat.name}
                                    </Link>
                                </button>
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

export default Categories