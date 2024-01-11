import { useEffect, useState } from "react"
import { getProducts } from "../../actions/products/products"
import { auth } from "../../firebase-config"
import pending from "../../images/pending.png"
import completed from "../../images/completed.png"
import product from "../../images/products.png"
import AOS from "aos"
import "aos/dist/aos.css"
import { getVendorOrders } from "../../actions/products/orders"
import { id } from "../../actions/auth/auth"
import test from "../../images/test.jpg"

const Stats = () => {
  const [products, setProducts] = useState([])
  const [orders, setorders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  console.log(orders)
  useEffect(()=>{
    getProducts(setIsLoading, setProducts)
    getVendorOrders(id, setorders)
  },[])

  useEffect(()=>{
    AOS.init()
  },[])

  console.log(orders);


  const filteredProducts = products.filter(product=> product[1]?.createdBy?.id === auth?.currentUser?.uid)
  const completedOrder = orders.filter(order => order[1]?.products?.status === "Delivered")
  const pendingOrder = orders.filter(order => order[1]?.products?.status === "Pending")
  

  return (
    <main className="mt-32 mb-[10px]"  data-aos={"fade-up"} data-aos-duration={"900"}>
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

      <section className="mt-20 ">
        <h2 className="text-2xl text-center  sm:text-[25px] leading-3 text-slate-700 font-medium font-[arial] tracking-wide">All Orders</h2>
        <section className=" grid grid-cols-4 mx-7 my-6 gap-6">
          {orders.map(order=>{
            return<article className="bg-white shadow-md hover:shadow-lg rounded-md">
              <img src={test} alt="" className="w-full h-[200px] object-cover"/>
              <article className="p-3 pb-1.5  ">
                  <h2 className="text-slate-700 font-medium my-1 sm:text-lg">{order[1]?.products?.name}</h2>
                  <h4 className="text-sm text-blue-700 tracking-wider my-1">₦{order[1]?.products?.price}</h4>
                  <h3>{order[1]?.products?.brand}</h3>
                  <h3>{order[1]?.products?.productQuantityAvailable}</h3>
                </article>
                <article>
                  <h4 className={order[1]?.products?.status === "Deliverd" ? "bg-blue-100 shadow-md px-2 py-1.5 tracking-wider  text-green-700 text-xs": "bg-blue-100 shadow-md px-2 py-1.5 tracking-wider  text-red-700 text-xs"}>{order[1]?.products?.status}</h4>
                  
                  {/* <h4 className="mt-3 text-[13px] tracking-wider text-slate-600 flex items-center">
                    <img src={allProduct} alt="products" className="w-4 mr-1"/>
                    <span>{product[1]?.quantity}</span></h4> */}
                </article>
            </article>
          })}
        </section>
      </section>
    </main>
  )
}

export default Stats
