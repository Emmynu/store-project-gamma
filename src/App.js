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
import Pricing from "./pages/sellers/Pricing"
import NotFound from "./pages/home/notFound"
import Profile from "./pages/auth/Profile"
import Chat from "./pages/chat/Chat"
import FeedBack from "./pages/products/FeedBack"
import Dashboard from "./pages/sellers/Dashboard"
import Stats from "./pages/sellers/Stats"
import Products from "./pages/sellers/Products"
import OrderOptions from "./pages/products/OrderOptions"
import Orders from "./pages/products/Orders"
import OrderSuccess from "./pages/products/OrderSuccess"
import Admin from "./pages/admin/Admin"
import AdminLogin, { adminLoginAction }   from "./pages/admin/AdminLogin"
import ProtectAdmin from "./pages/admin/ProtectAdmin"
import Chats from "./pages/chat/Chats"
import Refund from "./pages/admin/Refund"
import Payment from "./pages/home/help/Payment"
import PlaceOrder from "./pages/home/help/PlaceOrder"

export default function App(){
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<Navigation />}> 
      <Route index  element={<Home />} />
      
      {/* Products Routes*/}
      <Route path="product/:id/:category/:brand" element={<Detailed />}/>
      <Route path="product/:id/:category/:brand/feedback" element={<FeedBack />}/>
      <Route path="search" element={<Search />}/>
      <Route path="help/payment" element={<Payment />}/>
      <Route path="help/place-order" element={<PlaceOrder />}/>
      <Route path="pricing" element={<Pricing />}/>
     

      {/* Protected Routes*/}
      <Route element={<ProtectRoute />}>
        <Route path="profile" element={<Profile />}/>
        <Route path="checkout" element={<Checkout />}/>
        <Route path="checkout/delivery-options" element={<OrderOptions />}/>
        <Route path="orders" element={<Orders />}/>
        <Route path="order/success" element={<OrderSuccess />}/>
        <Route path="collections" element={<Collections />}/>
      </Route>
      

      <Route path="*" element={<NotFound />}/>
     </Route>

    {/*Authentication Routes*/}
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} action={loginAction}/>
    <Route path="/find-account" element={<ForgotPassword />} /> 

    <Route element={<ProtectRoute />}>
      <Route path="chats" element={<Chats />}/>
      <Route path="chat/:chatId/:userId" element={<Chat />}/>

      {/* Dashboard */}
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Stats />}/>
        <Route path="new-product" element={<NewProduct />}/>
        <Route path="products" element={<Products />}/>
      </Route>
    </Route>
    
    {/* admin */}
    <Route element={<ProtectAdmin />}>
       <Route path="admin" element={<Admin />}/>
    </Route>
    <Route path="refund" element={<Refund />}/>
    <Route path="/admin/login" element={<AdminLogin />} action={adminLoginAction}/>
    </>
  ))
  return <RouterProvider router={router}/>
}
