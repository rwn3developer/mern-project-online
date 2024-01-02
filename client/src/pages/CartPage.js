import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth'
import { json, useNavigate } from 'react-router-dom'

const CartPage = () => {

    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        let total = 0;
        cart?.map((item)=>{
            total = total + item.price
        });
        return total.toLocaleString("en-Us",{
            style : "currency",
            currency : "USD"
        })
    }

    const removeCartItem = (pid) => {
       try{
        let all = [...cart];
        let index = all.findIndex(item => item.id == pid);
        all.splice(index,1);
        setCart(all);
        localStorage.setItem('cart',JSON.stringify(all))
       }catch(err){
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
                        <div className='col-md-12'>
                            <h1 className='text-center'>Cart page</h1>
                            <h4 className='text-center'>{`hello ${auth.token && auth?.user?.name}`}</h4>
                            <h3 className='text-center'>
                                {cart?.length != 0
                                    ? `you have ${cart.length} item in your cart ${auth?.token ? "" : "please login to checkout"
                                    }`
                                    : "You cart is Empty"
                                }
                            </h3>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-md-8'> 
                            {
                                cart?.map((p) => {
                                    return (
                                        <div style={{border : '1px solid gray'}} className='row mb-2 p-3'>
                                            <div className='col-md-4'>
                                                {/* <img src="" className="card-img-top" alt="..." /> */}
                                                <img src={`http://localhost:8080/product/single-photo/${p._id}`} className="card-img-top" style={{
                                                    height
                                                        : "150px", objectFit: "cover"
                                                }} />
                                            </div>
                                            <div className='col-md-8'>
                                                <p>{p.name}</p>
                                                <p>{p.description.substring(0,30)}</p>
                                                <p>{p.price}</p>
                                                <button className='btn btn-danger' onClick={ () => removeCartItem(p._id) }>Remove</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className='col-md-4 text-center'>
                           <h2>Cart Summary</h2>
                           <p>Total | Checkout | Payment</p>
                           <hr/>
                           <h4>Total : - {totalPrice()}</h4>
                        </div>

                        {
                            auth?.user?.address ? (
                                <>
                                    <div className='mb-3'>
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className='btn btn-outline-warning' onClick={ () => navigate(`/dashboard/user/profile`) }>Update Address</button>
                                    </div>
                                </>
                            ) : (
                                <div className='mb-3'>
                                    {
                                        auth?.token ? (
                                            <button className='btn btn-outline-warning' onClick={ () => navigate(`/dashboard/user/profile`) }>Update Address</button>
                                        ) : (
                                            <button className='btn btn-outline-warning' onClick={ () => navigate('/login',{state : '/cart'}) }>Please Login to checkout</button>
                                        )
                                    }
                                </div>
                            )
                        }

                    </div>
                </div>

            </main>
            <Footer />
        </>
    )
}

export default CartPage
