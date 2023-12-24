import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Forgotpassword = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [newpassword,setNewPassword] = useState("")
    const [answer,setAnswer] = useState("");
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        let res = await axios.post("http://localhost:8080/forgot-password",{email,answer,newpassword});
        if(res.data.success){
            alert(res.data.messege);
            setEmail("");
            setNewPassword("");
            setAnswer("");
            navigate("/login");
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
        <h1 className='p-4 text-center'>Forgot Password</h1>
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
                        <label htmlFor="exampleInputPassword1" className="form-label">Your Faqvourite Sport Name</label>
                        <input type="text" onChange={ (e) => setAnswer(e.target.value) } value={answer} className="form-control" id="exampleInputPassword1" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Newpassword</label>
                        <input type="text" onChange={ (e) => setNewPassword(e.target.value) } value={newpassword} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      
                     
                      
                      <button type="submit" value="submit" className="btn btn-primary">Login</button>
                      
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

export default Forgotpassword