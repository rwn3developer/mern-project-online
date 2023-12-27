import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {

    const [cart,setCart] = useCart();
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();


    return (
        <>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center'>Cart page</h1>
                        {
                            `hello ${auth.token && auth?.user?.name}`
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default CartPage
