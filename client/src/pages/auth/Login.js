import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import axios from 'axios'
import { useNavigate ,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/Auth'

const Login = () => {
const navigate = useNavigate();
const location = useLocation();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [auth,setAuth] = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        let res = await axios.post("http://localhost:8080/login",{email,password});
        if(res.data.success){
            alert(res.data.messege);
            setAuth({
                ...auth,
                user : res.data.user,
                token : res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state || "/");
        }else{
            alert(res.data.messege);
        }
    }catch(err){
      console.log(err);
      return false;
    }
  }
                            

  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <div>
          <h1 className='p-4 text-center'>Login Page</h1>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                
                  <div style={{boxShadow : '1px 3px 3px 3px gray'}} className='p-4 col-lg-6 justify-content-center'>
                    <form onSubmit={handleSubmit}>
                     
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="text" onChange={ (e) => setEmail(e.target.value) } value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={ (e) => setPassword(e.target.value) } value={password} className="form-control" id="exampleInputPassword1" />
                      </div>
                     
                      
                      <button type="submit" value="submit" className="btn btn-primary">Login</button>
                      <button onClick={ () => {navigate('/forgot-password')} } className='btn btn-dark ms-5'>Forgot Password</button>
                    </form>

                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>




  )
}

export default Login