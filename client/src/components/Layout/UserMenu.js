import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
           
                <div className='text-center'>
                    <div className="list-group">
                        <h4>Dashboard</h4>
                        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
                        <NavLink to="/dashboard/user/order"  className="list-group-item list-group-item-action">Orders</NavLink>
                      
                    
                    </div>
                </div>


            
        </>
    )
}

export default UserMenu