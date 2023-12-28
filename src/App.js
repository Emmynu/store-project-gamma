import  { createBrowserRouter,createRoutesFromElements,Route, RouterProvider } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login, { loginAction } from "./pages/auth/Login"
import ForgotPassword from "./pages/auth/ForgotPassword"
import NewProduct from "./pages/products/newProduct"
import Navigation from "./pages/home/Navigation"
import ProtectRoute from "./pages/home/ProtectRoute"
import Home from "./pages/home/Home"
import Detailed from "./pages/products/Detailed"
import Collections from "./pages/products/Collections"
import Search from "./pages/products/Search"
import Checkout from "./pages/products/Checkout"
import Help from "./pages/home/Help"
import Pricing from "./pages/sellers/Pricing"
import NotFound from "./pages/home/notFound"
import CustomerSideBar from "./components/sideBar"
import Profile, { updateProfileAction } from "./pages/auth/Profile"


export default function App(){
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<Navigation />}> 
      <Route index  element={<Home />} />
      
      {/* Products Routes*/}
      <Route path="product/:id/:category/:brand" element={<Detailed />}/>
      <Route path="search" element={<Search />}/>
      <Route path="help" element={<Help />}/>
      <Route path="pricing" element={<Pricing />}/>
     

      {/* Protected Routes*/}
      <Route element={<ProtectRoute />}>
        <Route path="profile" element={<Profile />} action={updateProfileAction}/>
        <Route path="checkout" element={<Checkout />}/>
        <Route path="new-product" element={<NewProduct />}/>
        <Route path="collections" element={<Collections />}/>
      </Route>

      <Route path="*" element={<NotFound />}/>
     </Route>

    {/*Authentication Routes*/}
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} action={loginAction}/>
    <Route path="/find-account" element={<ForgotPassword />} /> 

    </>
  ))
  return <RouterProvider router={router}/>
}
