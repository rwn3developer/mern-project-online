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
            <div className='row'>
                {
                    categories.map((cat)=>{
                        return (
                            <div>
                                <Link to={`/category/${cat.slug}`}>
                                    {cat.name}
                                </Link>
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