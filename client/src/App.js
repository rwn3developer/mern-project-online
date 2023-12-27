import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/Private";
import Forgotpassword from "./pages/auth/Forgotpassword";
import AdminRoute from "./components/Layout/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCategory from "./pages/Admin/category/AdminCategory";
import AdminProduct from "./pages/Admin/product/AdminProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import AdminAddCategory from "./pages/Admin/category/AdminAddCategory";
import AdminEditCategory from "./pages/Admin/category/AdminEditCategory";
import AdminAddProduct from "./pages/Admin/product/AdminAddProduct";
import AdminEditproduct from "./pages/Admin/product/AdminEditproduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryWiseFilter from "./pages/CategoryWiseFilter";
import CartPage from "./pages/CartPage";
//mahadev


function App() {
  return (
    <>
        <Routes>
            
                <Route element={<Layout/>}>
                <Route  path="/" element={<Home/>}></Route>
                <Route path="/product/:slug" element={<ProductDetails/>}></Route>
                <Route path="/categories" element={<Categories/>}></Route>
                <Route path="/category/:slug" element={<CategoryWiseFilter/>}></Route>
                <Route path="/cart" element={<CartPage/>}></Route>



                <Route  path="/search" element={<Search/>}></Route>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/register" element={<Register/>}></Route>
                  <Route path="/forgot-password" element={<Forgotpassword/>}></Route>
                  <Route path="/dashboard" element={<PrivateRoute/>}>
                        <Route path="user" element={<Dashboard/>}></Route>
                        <Route path="user/order" element={<Orders/>}></Route>
                        <Route path="user/profile" element={<Profile/>}></Route>


                  </Route>

                    <Route path="/dashboard" element={<AdminRoute/>}>
                        <Route path="admin" element={<AdminDashboard/>}/>

                        {/* admin category route */}
                        <Route path="admin/category" element={<AdminCategory/>}/>
                        <Route path="admin/addcategory" element={<AdminAddCategory/>}/>
                        <Route path="admin/editcategory/:slug" element={<AdminEditCategory/>}/>
                        {/* admin category route */}

                        {/* admin product route */}
                        <Route path="admin/product" element={<AdminProduct/>}/>
                        <Route path="admin/addproduct" element={<AdminAddProduct/>}/>
                        <Route path="admin/editproduct/:slug" element={<AdminEditproduct/>}/>


                        {/* admin product route */}

                        <Route path="admin/users" element={<Users/>}/>


                    </Route>

                  <Route  path="/home" element={<Home/>}></Route>
                  <Route  path="/about" element={<About/>}></Route>
                  <Route  path="/contact" element={<Contact/>}></Route>
                  <Route  path="/policy" element={<Policy/>}></Route>
                  <Route  path='*' element={<Pagenotfound/>}></Route>
                </Route>

                
                




            
        </Routes>
    </>
  );
}

export default App;
