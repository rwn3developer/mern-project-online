import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import SearchInput from './SearchInput';
import useCategory from '../../hook/useCategory';

const Header = () => {

  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth')
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">Mahadev</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to='/home' className="nav-link">Home</NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link to={'/categories'} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={'/categories'} className='dropdown-item'>All Categories</Link>
                  </li>
                  {
                    categories.map((c)=>{
                      return (
                        <Link to={`/categories/${c.slug}`} className="dropdown-item">{c.name}</Link>
                      )
                    })
                  }
                </ul>
              </li>


              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to='/register' className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link">Login</NavLink>
                  </li>
                </>) : (<>


                  <div className="btn-group">
                    <button type="button" className="btn btn-info btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="nav-link">Dashboard</NavLink>
                      </li>
                      <li className="dropdown-item">
                        <NavLink onClick={() => handleLogout()} to='/login' className="nav-link">Logout</NavLink>
                      </li>
                    </ul>
                  </div>



                </>)
              }

              <li className="nav-item">
                <NavLink to='/cart' className="nav-link">Cart (0)</NavLink>
              </li>


            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Header