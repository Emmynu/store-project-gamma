import { Outlet } from "react-router-dom"


const ProtectAdmin = () => {
  const adminHash  = localStorage.getItem("admin")
     return  adminHash === "12345"  ? <Outlet /> : window.location = "/admin/login"
}

export default ProtectAdmin
