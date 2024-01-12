import { useState, useEffect } from "react"
import { getOrders, saveRefund, updateOrders } from "../../actions/products/orders"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CustomerSideBar from "../../components/sideBar"
import AOS from "aos"
import "aos/dist/aos.css"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import emptyCollection from "../../images/fly.gif"
import { auth } from "../../firebase-config"
import { toast } from "sonner"


const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const expiryOrderDate = 24 * 60 * 60 * 1000 * 3

  useEffect(()=>{
    getOrders(setOrders, setIsFetching)
    AOS.init()
  },[])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  }

  async function requestRefund(id,status, paymentOption, product,time) {
    if(status === "Delivered"){
      if (time < expiryOrderDate) {
        await updateOrders(auth?.currentUser?.uid, id, "Cancelled")
        await saveRefund(id, {
          refundStatus: "pending",
          products:product,
          refundType:"Payment",
          createdOrderAt: time
        })
      }
      else{
        toast.error("Refund date has been exceeded")
      }
    }
    else if(status === "pending"){
     if(paymentOption === "online"){
      await updateOrders(auth?.currentUser?.uid, id, "Cancelled")
      await saveRefund(id, {
        refundStatus: "pending",
        products:product,
        refundType:"Payment",
        createdOrderAt: time
      })
     }
    }
  }

  
  console.log(orders);

  return (
    <main className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-[72rem]  mx-3 md:mx-auto md:px-3 items-start  gap-9  my-3 lg:my-12"}>
      <section>
        <CustomerSideBar />
      </section>
      <section className="flex flex-col gap-4 bg-white border drop-shadow-md rounded-[4px] col-span-3 lg:col-span-2 px-3.5 md:px-7 py-4 " data-aos={"fade-up"} data-aos-duration={"900"}>
        <header className="flex justify-between pt-1 pb-3 border-b">
          <h2 className=" text-xl font-medium">Orders</h2>
        </header>
        {orders.length > 0 ? orders.map(order=>{
          console.log(order)
          return <article className="border border-slate-300 flex gap-2 sm:gap-6 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ">
                <Slider {...settings} className=" overflow-x-hidden">
                  {order[1]?.products?.map(product=>{
                    return <>
                      <section className="flex  gap-2.5 sm:gap-6 cursor-pointer">
                        <div className="h-[170px] w-[170px] md:w-[200px] ">
                          <img src={product[1]?.url} alt={product[0]} className="h-full w-full object-cover"/>
                        </div>

                        <div className=" my-2.5 ">
                          <h2 className=" font-medium md:text-[18px] my-1 text-slate-700">{product[1]?.name}</h2>
                          <h4 className="text-xs md:text-sm text-slate-600 tracking-wider mb-3 select-text">Order ref: {order[0]}</h4>
                          <span className={order[1].status === "Delivered" ? "px-2 bg-green-700 uppercase text-[12px]  md:text-xs tracking-wider text-white py-1" : order[1]?.status === "pending" ? "px-2 bg-yellow-600 uppercase text-[12px]  md:text-xs tracking-wider text-white py-1": "bg-red-700 px-2 uppercase text-[12px]  md:text-xs tracking-wider text-white py-1"}>{order[1]?.status}</span>
                         {order[1]?.status !== "Cancelled" &&  <button className="text-xs text-red-600 bg-red-100 px-2 py-1.5 ml-1.5 tracking-wide rounded-[4px]" onClick={()=>requestRefund(order[0], order[1]?.status,  order[1]?.deliveryOption, product[1], order[1]?.createdOrder)}>Cancel</button>}

                          <br />

                            <h3 className="mt-2 font-medium text-sm md:text-[15px] text-slate-600">
                              <Moment fromNow  >
                                {order[1]?.createdOrder}
                              </Moment>
                            </h3>
                        </div>
                      </section>
                    </>
                  })}
                </Slider>
              </article>
        }) : 
        <article className="flex flex-col  items-center text-center">
          <img src={emptyCollection} alt="collection-image" className="w-[300px]"/>
          <h2 className="font-medium text-slate-800 -mt-1.5 text-center">You haven't bought any item yet!</h2>
          <h4 className="my-2 text-xs tracking-wider md:text-sm">Found something you like? Tap on the AddToCart button next to the item to add it to your cart! All your orders will appear here.</h4>
          <Link to="/"><button className="bg-blue-700 px-5 py-1.5 rounded-[4px] text-white tracking-wider text-sm my-1.5">Continue Shopping</button></Link>
        </article>}
      </section>
    </main>
  )
}



export default Orders
