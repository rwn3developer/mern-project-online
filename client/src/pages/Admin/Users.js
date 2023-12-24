import React from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import AdminMenu from '../../components/Layout/AdminMenu'
const Users = () => {
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
                        <h3>User</h3>
                  </div>
              </div>
          </div>
        </main>
        <Footer />
    </>
  )
}

export default Users