import { useEffect, useState } from "react"
import { getAllOrders } from "../../actions/products/orders"


const Admin = () => {
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    getAllOrders(setOrders)
  },[])

  console.log(orders);
  return (
    <div>
      
    </div>
  )
}

export default Admin
