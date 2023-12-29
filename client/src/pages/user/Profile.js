import React, { useEffect, useState } from 'react'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/Auth'
import axios from 'axios'

const Profile = () => {

    //context
    const [auth,setAuth] = useAuth();
    //state
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("");

    //user get data
    useEffect(()=>{
        const {name,email,phone} = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
    },[auth?.user])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`http://localhost:8080/update-profile`,{
                name,password,phone
            })
            // console.log(data);
            setAuth({...auth,user : data?.updatedUser});
            let ls = JSON.parse(localStorage.getItem('auth'));
            ls.user = data.updatedUser;
            localStorage.setItem('auth',JSON.stringify(ls));
            alert("profile successfully update");
        }catch(err){
            console.log(err);
            return false;
        }
    }

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
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h1>User Profile</h1>
                                    <div style={{ boxShadow: '1px 3px 3px 3px gray' }} className='p-4 col-lg-6 justify-content-center'>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text"></div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                <input type="text" disabled onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text"></div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                                                <input type="number" onChange={(e) => setPhone(e.target.value)} value={phone} className="form-control" id="exampleInputPassword1" />
                                            </div>
                                          
                                            {/* <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Role</label>
                        <select className='form-control'>
                            <option>---select role</option>
                        </select>
                      </div> */}

                                            <button type="submit" value="submit" className="btn btn-primary">Update</button>
                                        </form>

                                    </div>
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

export default Profile