import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import axios from 'axios'

const Register = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("");
  const [sport,setSport] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
      console.log(sport);
    try{
        let res = await axios.post("http://localhost:8080/register",{name,email,password,phone,sport});
        if(res.data.success){
          alert(res.data.messege)
          setName("");
          setEmail("");
          setPassword("");
          setPhone("");
          setSport("");

        }else{
          alert(res.data.messege)
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
          <h1 className='p-4 text-center'>Register Page</h1>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                
                  <div style={{boxShadow : '1px 3px 3px 3px gray'}} className='p-4 col-lg-6 justify-content-center'>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" onChange={ (e) => setName(e.target.value) } value={name} className="form-control" id="exampleInputEmail1"  aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="text" onChange={ (e) => setEmail(e.target.value) } value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={ (e) => setPassword(e.target.value) } value={password} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                        <input type="number" onChange={ (e) => setPhone(e.target.value) } value={phone} className="form-control" id="exampleInputPassword1" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">What is Your Faviourte sports ?</label>
                        <input type="text" onChange={ (e) => setSport(e.target.value) } value={sport} className="form-control" id="exampleInputPassword1" />
                      </div>
                      {/* <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                        <select className='form-control'>
                            <option>---select role</option>
                        </select>
                      </div> */}
                      
                      <button type="submit" value="submit" className="btn btn-primary">Submit</button>
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

export default Register