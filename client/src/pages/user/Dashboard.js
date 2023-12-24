import React from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/Layout/UserMenu'
const Dashboard = () => {

  const [auth] = useAuth();

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
              <div className='card w-75 p-3'>
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.phone}</h3>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Dashboard