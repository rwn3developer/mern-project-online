import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'

const Orders = () => {
    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                <div className='container-fluid m-3 p-3'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <UserMenu />
                        </div>
                        <div className='col-lg-9'>
                            <h1>All Orders</h1>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Orders