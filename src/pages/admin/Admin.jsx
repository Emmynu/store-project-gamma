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
import { LoadVendorProducts } from "../../components/Loading"
import Moment from "react-moment"
import clock from "../../images/clock.png"
import allProduct from "../../images/all-products.png"



const Admin = () => {
  const [orders, setOrders] = useState([])
  const [newOrders, setNewOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getAllOrders(setOrders, setIsLoading)
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
        
       <> { isLoading ? <LoadVendorProducts/> : <main>
          {orders.map(order=>{
          const orderRef = Object.entries(order[1])
        
          return <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 mt-8 md:mx-7 lg:mx-12">
                
                {orderRef.map(ref=>{
                  return <section className="bg-white shadow-md hover:shadow-lg transition-[2s_all_linear] rounded-md cursor-pointer">
                    <article> 
                     
                     <Slider {...settings}>{ref[1]?.products.map(product=>{
                      return <>
                        <Product product={product} orderId={ref[0]} userId={order[0]} orders={orderRef} at={ref[1]?.createdOrderAt}/>
                        </>
                    })} </Slider>
                    </article>          
                </section>
              })}
            </article>
        
          })}
      </main>}</>
      </section>
      </main>}
    </main>
  )
}


function Product({ product, orderId, userId, orders, at }) {
  const [userProducts, setUserProducts] =  useState([])
  const [isLoading, setIsLoading] =  useState(false)
  
  useEffect(()=>{
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
     <img src={product.url[0]} alt={product?.productId}  className="w-full h-[200px] object-cover"/>
      <section  className="p-3 pb-1.5 mt-2 flex items-center justify-between">
        <article>
          <h2  className="text-slate-700 font-medium my-1 sm:text-lg">{product?.name}</h2>
          <h2 className="text-sm text-blue-700 tracking-wider my-1">₦{product?.price}</h2>

          <div className="flex items-center my-1.5">
            <img src={clock} alt="clock" className="w-4 mr-1"/> 
            <Moment fromNow className="text-sm  text-slate-600 tracking-wider ">
              {at}
            </Moment>
        </div>
        </article>
       
        <article>
          <h4 className="bg-blue-100 shadow-md px-2 py-1.5 tracking-wider  text-blue-700 text-xs">{product?.status}</h4>
          
          <h4 className="mt-3 text-[13px] tracking-wider text-slate-600 flex items-center">
            <img src={allProduct} alt="products" className="w-4 mr-1"/>
            <span>{product?.quantity}</span></h4>
        </article>
      </section>
  {product?.status !== "pending" && <> <button className="ml-3 shadow px-4 py-1 text-blue-700 bg-blue-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide">Delivered</button>
    <button onClick={cancelOrder} className="ml-3 shadow px-4 py-1 text-red-800 bg-red-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide">Cancel</button>
    </>}
  </main>
  )
  
}
export default Admin
