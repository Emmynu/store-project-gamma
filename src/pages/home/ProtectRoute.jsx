import { id } from "../../actions/auth/auth"
import { Outlet } from "react-router-dom"

const ProtectRoute = () => {
  return id === null ? window.location = "/login" : <Outlet />
}

export default ProtectRoute
