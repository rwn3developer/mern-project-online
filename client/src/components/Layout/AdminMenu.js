import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
           
                <div className='text-center'>
                    <div className="list-group">
                        <h4>Admin Panel</h4>
                        <NavLink to="/dashboard/admin/addcategory" className="list-group-item list-group-item-action">Add category</NavLink>
                        <NavLink to="/dashboard/admin/category" className="list-group-item list-group-item-action">Category</NavLink>
                        <NavLink to="/dashboard/admin/addproduct" className="list-group-item list-group-item-action">Add product</NavLink>

                        <NavLink to="/dashboard/admin/product"  className="list-group-item list-group-item-action">Product</NavLink>
                        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                    
                    </div>
                </div>


            
        </>
    )
}

export default AdminMenu