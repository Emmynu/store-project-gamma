import { useEffect, useState } from "react"
import { getAllOrders, getVendorOrders, saveRefund, updateOrders, updateVendorOrders } from "../../actions/products/orders"


const Admin = () => {
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    getAllOrders(setOrders)
  },[])


  return (
    <main>
     {orders && <section>
        {orders.map(order=>{
          const orderRef = Object.entries(order[1])
         return <article className="mt-8">
          {orderRef.map(ref=>{
            return <section>
              <h2>{ref[1]?.deliveryOption}</h2>
              <h2>{ref[1]?.status}</h2>
              <article>{ref[1].products.map(product=>{
                return <>
                  <Product product={product[1]} orderId={ref[0]} userId={order[0]} order={orderRef}/>
                </>
              })}</article>
              
            </section>
          })}
         </article>
        })}
      </section>}
    </main>
  )
}


function Product({ product, orderId, userId, order }) {
  const [vendorOrders, setVendorOrders] = useState([])
  
  useEffect(()=>{
    getVendorOrders(product?.createdBy, setVendorOrders) 
  },[])



  function updateCustomerOrder(userId, orderId, vendorId) {
    updateOrders(userId,orderId, "Delivered").then(res=>{
      vendorOrders.map(order=>{
        if(order[1]?.orderRef === orderId){
          updateVendorOrders(vendorId, order[0], "Delivered")
        }
      })
    })
  }

  function cancelOrder(userId, orderId, vendorId) {
    updateOrders(userId,orderId, "Cancelled").then(res=>{
      vendorOrders.map(order=>{
        if(order[1]?.orderRef === orderId){
          updateVendorOrders(vendorId, order[0], "Cancelled")
        }
      })
    })
    .then(res=>{
      order.map(item=>{
        saveRefund(item[0],{
          refundStatus: "pending",
          products:item[1]?.products,
          refundType:"Payment",
          createdOrderAt: item[1]?.createdOrder 
        })
      })
    })
  }



  return (
   <main>
     <h2>{product?.name}</h2>
      <button onClick={() => updateCustomerOrder(userId, orderId, product?.createdBy)}>Delivered</button>
      <button onClick={()=> cancelOrder(userId, orderId, product?.createdBy)}>Cancel</button>
      <button onClick={()=>console.log(order)}>Order</button>
  </main>
  )
  
}
export default Admin
