import axios from "axios";
import { useState , useEffect , useContext , createContext} from "react";

const Authcontext =  createContext();

const AuthProvider = ({children}) => {
    const [auth,settAuth] = useState({
        user : null,
        token : ""
    });
    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('auth'));
        if(data){
            settAuth({
                ...auth,
                user : data.user,
                token : data.token
            })
        }
    },[]);
    return (
        <Authcontext.Provider value={[auth,settAuth]}>
            {children}
        </Authcontext.Provider>
    )
}

//custom hook
const useAuth = () =>   useContext(Authcontext);

export {useAuth,AuthProvider};