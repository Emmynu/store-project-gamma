import { id } from "../../actions/auth/auth"
import { Outlet } from "react-router-dom"
import { AdminHash } from "../admin/AdminLogin"

const ProtectRoute = () => {
  return ( id === null || id === AdminHash) ? window.location = "/login" : <Outlet />
}


export const ChatProtectedRoute = () => {
  return id === null ? window.location = "/login" : <Outlet />
}

export default ProtectRoute
