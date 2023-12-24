import React from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/Auth'
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
       <Header />
      <main style={{ minHeight: '80vh' }}>
          <div className='container-fluid m-3 p-3'>
              <div className='row'>
                  <div className='col-lg-3'>
                      <AdminMenu/>
                  </div>
                  <div className='col-lg-9'>
                      <div className='card w-75 p-3'>
                        <h3>Admin Name :- {auth?.user?.name}</h3>
                        <h3>Admin Email :- {auth?.user?.email}</h3>
                        <h3>Admin Phone :- {auth?.user?.phone}</h3>

                      </div>
                  </div>
              </div>
          </div>
      </main>
      <Footer />
    </>
  )
}

export default AdminDashboard