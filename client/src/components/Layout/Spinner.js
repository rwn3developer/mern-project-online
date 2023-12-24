import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = () => {
    const navigate = useNavigate();
    const [count,setCount] = useState(3);
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((preValue)=> --preValue);
        },1000)
        count === 0 && navigate("/login",{
            state : location.pathname
        })
        return () => clearInterval(interval);
    },[count,navigate,location])

    return (
        <>
        
            <div className="d-flex justify-content-center align-items-center text-center" style={{height : '100vh'}}>
            <h1 className='text-center'>Loading {count}</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner