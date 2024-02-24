import { useEffect, useState } from "react"
import { getProducts } from "../../actions/products/products"
import { auth } from "../../firebase-config"
import pending from "../../images/pending.png"
import completed from "../../images/completed.png"
import product from "../../images/products.png"
import load from "../../images/loading.png"
import AOS from "aos"
import empty from "../../images/notFound.png"
import clock from "../../images/clock.png"
import allProduct from "../../images/all-products.png"
import "aos/dist/aos.css"
import {  getUserOrderProduct, getVendorOrders, updateVendorOrders } from "../../actions/products/orders"
import { id } from "../../actions/auth/auth"
import {LoadVendorProducts } from "../../components/Loading"
import Slider from "react-slick"
import { settings } from "./Products"
import Moment from "react-moment"
import { useSearchParams, Link } from "react-router-dom"
import { update,ref, getDatabase } from "firebase/database"



const Stats = () => {
  const [products, setProducts] = useState([])
  const [orders, setorders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [params, setParams] = useSearchParams()

  const status = params.get("status")
 
  useEffect(()=>{
    getProducts(setIsLoading, setProducts)
    getVendorOrders(id, setorders)
  },[])

  useEffect(()=>{
    AOS.init()
  },[])



  const filteredProducts = products.filter(product=> product[1]?.createdBy?.id === auth?.currentUser?.uid)
  const completedOrder = orders.filter(order => order[1]?.products ?.status === "Delivered")
  const pendingOrder = orders.filter(order => order[1]?.products?.status === "pending")

  const newOrders =  status ? orders.filter(order => order[1]?.products?.status.toLowerCase() === status.toLowerCase()) : orders

  
  return (
    <main className="mt-32 mb-[10px]"  >
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-7 sm:gap-12 mx-3 md:mx-9">

        <div className="bg-white shadow-md shadow-slate-200 border drop-shadow-md rounded-md p-9 border-b-[7px] border-yellow-600"  data-aos={"fade-left"} data-aos-duration={"900"}>
          <header className="flex items-center justify-between">
            <h2 className="text-3xl text-yellow-600 font-bold">{pendingOrder.length}</h2>
            <div className=" p-3 rounded-[4px] bg-orange-100"><img className="w-7" src={pending} alt="pending"/></div>
          </header>
          <footer>
            <h2 className="mt-3 text-lg tracking-wider">Pending Orders</h2>
          </footer>
        </div>

        <div className="bg-white shadow-md shadow-slate-200 border  rounded-md p-9 drop-shadow-md border-b-[7px] border-green-600"  data-aos={"fade-left"} data-aos-duration={"1100"}>
          <header className="flex items-center justify-between">
            <h2 className="text-3xl text-green-600 font-bold">{completedOrder.length}</h2>
            <div className="bg-green-100 p-3 rounded-[4px]"><img className="w-7" src={completed} alt="pending"/></div>
          </header>
          <footer>
            <h2 className="mt-3 text-lg tracking-wider">Completed Orders</h2>
          </footer>
        </div>


        <div className="bg-white shadow-md drop-shadow-md shadow-slate-200 border rounded-md p-9 border-b-[7px] border-blue-700"  data-aos={"fade-left"} data-aos-duration={"1300"}>
          <header className="flex items-center justify-between">
            <h2 className="text-3xl text-blue-600 font-bold">{filteredProducts.length}</h2>
            <div className="bg-blue-100 p-3 rounded-[4px]"><img className="w-8" src={product} alt="pending"/></div>
          </header>
          <footer>
            <h2 className="mt-3 text-[17px] tracking-wider">Products Uploaded</h2>
          </footer>
        </div>
      </section>
 
    <section className="mt-20   ">
        <h2 className="text-2xl text-center  sm:text-[25px] leading-3 text-slate-700 font-medium font-[arial] tracking-wide">All Orders</h2>
        <header className="flex items-center justify-center mt-5 overflow-x-scroll scrollbar-thin">
          <h2 className="px-4 py-1 rounded-[4px] shadow-lg ml-2 bg-blue-700 text-white text-sm tracking-wider"><Link to={``}>All</Link></h2>
          <h2 className="px-4 py-1 rounded-[4px] shadow-lg ml-2 bg-blue-700 text-white text-sm tracking-wider"><Link to={`?status=pending`}>Pending</Link></h2>
          
          <h2 className="px-4 py-1 rounded-[4px] shadow-lg ml-2 bg-blue-700 text-white text-sm tracking-wider"><Link to={`?status=Delivered`}>Completed</Link></h2>
          <h2 className="px-4 py-1 rounded-[4px] shadow-lg ml-2 bg-blue-700 text-white text-sm tracking-wider"><Link to={`?status=Cancelled`}>Cancelled</Link></h2>
        </header>
       {isLoading ? <section className="mt-8"> <LoadVendorProducts /></section> : <section >
          {orders.length > 0 ? <section  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 mt-8 md:mx-7 lg:mx-12">
            { newOrders.reverse().map(order=>{
            return <Link to={`?orderedBy=${order[1]?.orderedBy}&orderId=${order[0]}&productId=${order[1]?.products?.productId}`}>
              <article className="bg-white shadow-md hover:shadow-lg transition-[2s_all_linear] rounded-md" >
                  <section>
                    <Slider {...settings}>
                      {order[1]?.products?.url?.map(image=>{
                        return <img src={image} className="w-full h-[200px] object-cover"/>
                      })}
                    </Slider>
                  </section>
                  <section className="p-3 pb-1.5 mt-2 flex items-center justify-between">
                  <article>
                    <h2 className="text-slate-700 font-medium my-1 sm:text-lg">{order[1]?.products?.name}</h2>
                    <h4 className="text-sm text-blue-700 tracking-wider my-1">₦{order[1]?.products?.price}</h4>
                  <div className="flex items-center my-1.5">
                    <img src={clock} alt="clock" className="w-4 mr-1"/> 
                      <Moment fromNow className="text-sm  text-slate-600 tracking-wider ">
                        {order[1]?.createdAt}
                      </Moment>
                  </div>
                  </article>  
                  <article>
                    <h4 className="bg-blue-100 shadow-md px-2 py-1.5 tracking-wider  text-blue-700 text-xs">{order[1]?.products?.status}</h4>
                    
                    <h4 className="mt-3 text-[13px] tracking-wider text-slate-600 flex items-center">
                      <img src={allProduct} alt="products" className="w-4 mr-1"/>
                      <span>{order[1]?.products?.quantity}</span></h4>
                  </article>
                </section>

                <UpdateOrderStatus  status={order[1]?.products?.status} time={order[1]?.createdAt}/>                
              </article>
            </Link>
          })}
          </section>: <section className="mt-6 flex flex-col items-center justify-center text-center">
          <img src={empty} alt="empty" />
          <h3 className="text-slate-700 tracking-wide font-medium -mt-7">Unfortunately, Your Orders is empty</h3>

          <p className="text-sm text-slate-600 tracking-widest my-1.5 text-center">Sorry to inform you {auth?.currentUser?.displayName}, But nobody has ordered your product yet!</p>
        </section>}
        </section>}
      </section>
    </main>
  )
}


function UpdateOrderStatus({ status, time }){

  const [params, setParams] = useSearchParams()
  const orderedBy = params.get("orderedBy")
  const orderId = params.get("orderId")
  const productId = params.get("productId")
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState(false)
  const expiryOrderDate =  Date.now() - new Date(time).getTime() < 1000 * 60 * 60



 
  useEffect(()=>{
    getUserOrderProduct(orderedBy,orderId, setProducts, setIsLoading)
  },[orderId, orderedBy, productId])

  useEffect(()=>{
    if(!expiryOrderDate && products.length > 0 && status ==="pending"){
      changeOrderStatus("Cancelled")
    }
  }, [expiryOrderDate])

  function changeOrderStatus(status){
    const newProduct = products.filter(product => product[1]?.productId === productId)
    newProduct.map(product=>{
      updateVendorOrders(auth?.currentUser?.uid, orderId, status).then(res=>{
        const updates = {}
        updates[`orders/${orderedBy}/${orderId}/products/${product[0]}/status`] = status
        update(ref(getDatabase()), updates)
      }).then(res=>{
        params.delete("orderedBy")
        params.delete("productId")
        params.delete("orderId");
        setIsLoading(false)
      })
    })
  }

  function deliveredOrder() {
    changeOrderStatus("Delivered")
  }

  function cancelledOrder() {
    changeOrderStatus("Cancelled")
  }

  return <footer>                
     {status === "pending" && <section>
        <button className="ml-3 shadow px-4 py-1 text-blue-700 bg-blue-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide" onClick={deliveredOrder}>{isLoading ? <span><img src={load} alt=""className="w-5 animate-spin" /></span>: "Delivered"}</button>

      <button  className="ml-3 shadow px-4 py-1 text-red-800 bg-red-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide" onClick={cancelledOrder}>{isLoading ? <span><img src={load} alt=""className="w-5 animate-spin" /></span>: "Cancel"}</button>
      </section>}
  </footer>  
}

export default Stats
