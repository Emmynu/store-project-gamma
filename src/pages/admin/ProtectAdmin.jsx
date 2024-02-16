import { Outlet } from "react-router-dom"
import { AdminHash } from "./AdminLogin"


const ProtectAdmin = () => {
  const adminHash  = localStorage.getItem("id") 
     return  adminHash === AdminHash  ? <Outlet /> : window.location = "/admin/login"
}

export default ProtectAdmin
