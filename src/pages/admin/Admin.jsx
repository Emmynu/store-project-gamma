import { useEffect, useState } from "react"
import { getAllOrders, getVendorOrders, saveRefund, updateOrders, updateVendorOrders } from "../../actions/products/orders"
import pending from "../../images/pending-2.png"
import completed from "../../images/completed.png"
import cancel from "../../images/cancel.png"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


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
          console.log(orderRef);
          return <article  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 mt-8 md:mx-7 lg:mx-12">
            {orderRef.map(ref=>{
              return <section className="bg-white shadow-md hover:shadow-xl transition-all cursor-pointer ">
                <article>{ref[1].products.map(product=>{
                  return <>
                    <Product product={product} orderId={ref[0]} userId={order[0]} order={orderRef}/>
                    </>
                })}</article>
              

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


function Product({ product, orderId, userId, order }) {
  const [vendorOrders, setVendorOrders] = useState([])
  
  // console.log(product)
  useEffect(()=>{
    getVendorOrders(product?.createdBy, setVendorOrders) 
  },[])



  // function updateCustomerOrder(userId, orderId, vendorId) {
  //   updateOrders(userId,orderId, "Delivered").then(res=>{
  //     vendorOrders.map(order=>{
  //       if(order[1]?.orderRef === orderId){
  //         updateVendorOrders(vendorId, order[0], "Delivered")
  //       }
  //     })
  //   })
  // }

  // function cancelOrder(userId, orderId, vendorId) {
  //   updateOrders(userId,orderId, "Cancelled").then(res=>{
  //     vendorOrders.map(order=>{
  //       if(order[1]?.orderRef === orderId){
  //         updateVendorOrders(vendorId, order[0], "Cancelled")
  //       }
  //     })
  //   })
  //   .then(res=>{
  //     order.map(item=>{
  //       saveRefund(item[0],{
  //         refundStatus: "pending",
  //         products:item[1]?.products,
  //         refundType:"Payment",
  //         createdOrderAt: item[1]?.createdOrder 
  //       })
  //     })
  //   })
  // }


  console.log(product);


  return (
   <main>
    <div>{product.url.map(img =>{
      return <img src={img} alt={product?.productId} className="w-12 h-12 object-cover"/>
    })}</div>
     <h2>{product?.name}</h2>
     {/* <img src={product?.url} alt={product?.productId}/> */}

      <button>Delivered</button>
      <button>Cancel</button>
      <button >Order</button>
  </main>
  )
  
}
export default Admin
