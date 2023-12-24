import { useEffect,useState } from "react";
import { useAuth } from "../../../context/Auth";
import { Outlet, useLocation } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";


const AdminRoute = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    

    useEffect(()=>{
        const authCheck = async() => {
            const res = await axios.get("http://localhost:8080/admin-auth")
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token])

    return ok ? <Outlet/> : <Spinner/>

}

export default AdminRoute;