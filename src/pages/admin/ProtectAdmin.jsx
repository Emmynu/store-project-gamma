import { Outlet } from "react-router-dom"


const ProtectAdmin = () => {
  const adminHash  = localStorage.getItem("admin")
     return  adminHash  ? <Outlet /> : window.location = "/admin/login"
}

export default ProtectAdmin
