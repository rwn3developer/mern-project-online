import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = (pros) => {
  return (
    <>
          <main style={{minHeight : '80vh'}}>
            <Outlet/>
          </main>
    </>
  )
}
export default Layout;