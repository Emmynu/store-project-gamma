import { useEffect, useState } from "react"
import { getAllOrders, getUserOrderProduct, getVendorOrders, saveRefund, updateOrders, updateVendorOrders } from "../../actions/products/orders"
import pending from "../../images/pending-2.png"
import completed from "../../images/completed.png"
import cancel from "../../images/cancel.png"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { settings } from "../sellers/Products"
import { update, ref, getDatabase } from "firebase/database"



const Admin = () => {
  const [orders, setOrders] = useState([])
  const [newOrders, setNewOrders] = useState([])

  useEffect(()=>{
    getAllOrders(setOrders)
  },[])

  useEffect(()=>{
    orders.map(order=>{
      const orderItems = Object.entries(order[1])
      setNewOrders(orderItems)
    })
  },[orders])

  // console.log(orders);

  const pendingOrders = newOrders.filter(order => order[1]?.status === "pending")
  const completedOrders = newOrders.filter(order => order[1]?.status === "Delivered")
  const cancelledOrders = newOrders.filter(order => order[1]?.status === "Cancelled")

  return (
    <main className="mt-28">
     {orders && <main>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-7 sm:gap-12 mx-3 md:mx-9">

          
          <div className="bg-white shadow-md shadow-slate-200 border drop-shadow-md rounded-md p-9 border-b-[7px] border-yellow-600"  >
            <header className="flex items-center justify-between">
              <h2 className="text-3xl text-yellow-600 font-bold">{pendingOrders.length}</h2>
              <div className=" p-3 rounded-[4px] bg-orange-100"><img className="w-7" src={pending} alt="pending"/></div>
            </header>
            <footer>
              <h2 className="mt-3 text-lg tracking-wider">Pending Orders</h2>
            </footer>
          </div>

          <div className="bg-white shadow-md drop-shadow-md shadow-slate-200 border rounded-md p-9 border-b-[7px] border-red-700" >
            <header className="flex items-center justify-between">
              <h2 className="text-3xl text-red-600 font-bold">{cancelledOrders.length}</h2>
              <div className="bg-red-100 p-3 rounded-[4px]"><img className="w-8" src={cancel} alt="pending"/></div>
            </header>
            <footer>
              <h2 className="mt-3 text-[17px] tracking-wider">Cancelled Orders</h2>
            </footer>
          </div>

          <div className="bg-white shadow-md shadow-slate-200 border  rounded-md p-9 drop-shadow-md border-b-[7px] border-green-600"  >
            <header className="flex items-center justify-between">
              <h2 className="text-3xl text-green-600 font-bold">{completedOrders.length}</h2>
              <div className="bg-green-100 p-3 rounded-[4px]"><img className="w-7" src={completed} alt="pending"/></div>
            </header>
            <footer>
              <h2 className="mt-3 text-lg tracking-wider">Completed Orders</h2>
            </footer>
          </div>


         
      </section>


      <section className="my-10">
        <header className="text-2xl font-[arial] font-medium tracking-wide  text-center">All Orders</header>
        <main>
          {orders.map(order=>{
          const orderRef = Object.entries(order[1])
        
          return <article  className="max-w-[72rem] mx-6 lg:mx-auto my-1.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                
                {orderRef.map(ref=>{
                  return <section className=" bg-white shadow-md hover:shadow-xl my-4 transition-all cursor-pointer ">
                    <article> 
                     
                     <Slider {...settings}>{ref[1]?.products.map(product=>{
                      return <>
                        <Product product={product} orderId={ref[0]} userId={order[0]} orders={orderRef}/>
                        </>
                    })} </Slider>
                    </article>
                  

                    <h2>{ref[1]?.deliveryOption}</h2>
                    <h2>{ref[1]?.status}</h2>
                    <h2>{ref[0]}</h2>
                    
                </section>
              })}
            </article>
        
          })}
      </main>
      </section>
      </main>}
    </main>
  )
}


function Product({ product, orderId, userId, orders }) {
  // const [vendorOrders, setVendorOrders] = useState([])
  const [userProducts, setUserProducts] =  useState([])
  // const [totals, setTotal] =  useState(product?.price)
  const [isLoading, setIsLoading] =  useState(false)
  
  useEffect(()=>{
    // getVendorOrders(product?.createdBy, setVendorOrders) 
    getUserOrderProduct(userId, orderId, setUserProducts, setIsLoading)
  },[])




  function cancelOrder() {
    const newOrder  = orders.filter(item=>item[0]=== orderId)
    // console.log(newOrder, userId);
    newOrder.map(order =>{
      updateOrders(userId,order[0], "Cancelled" )
      // refund
      .then(res=>{
        if(order[1]?.paymentOption === "Online-Payment"){
          let newTotal = 0
         order[1]?.products.reduce((total,price)=>{
           total += parseInt( price?.price) * parseInt(price?.quantity )
            newTotal =  total
            return total
         },0)
         console.log(newTotal);
         
          saveRefund(orderId, {
            type: "payment",
            amount: newTotal,
            products:order[1]?.products,
            status:"pending"
          })
        }
      })
      .then(res=>{
        // cancel each product in the order
       userProducts.map(product=>{
         const updates = {}
          updates[`orders/${userId}/${orderId}/products/${product[0]}/status`] = "Cancelled"
          update(ref(getDatabase()), updates)
       })
      }).then(res=>{
        updateVendorOrders(product?.createdBy, orderId, "Cancelled")
      })
    })
  }




  return (
   <main>
     <img src={product.url[0]} alt={product?.productId} className="w-full h-[150px] rounded-md object-cover"/>
     <h2>{product?.name}</h2>
    <button >Delivered</button>
    <button onClick={cancelOrder}>Cancel</button>
  </main>
  )
  
}
export default Admin
