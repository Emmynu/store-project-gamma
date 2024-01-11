import { auth } from "../../firebase-config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getOrders } from "../../actions/products/orders"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const OrderSuccess = () => {
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    getOrders(setOrders)
  },[])

  const settings = {
    infinite: true,
    dots:false,
    slidesToScroll: 1,
    slidesToShow: 1
  }

  return (
    <main className="grid md:grid-cols-2  justify-center mt-10 mx-5 lg:m-10 gap-10 md:gap-5 lg:gap-12 ">
      <section>
        <img src="https://images.pexels.com/photos/4464482/pexels-photo-4464482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="sucess" className="w-full h-full object-cover rounded-md"/>
      </section>
      <section>
        <h2 className="text-[15px] text-blue-700 tracking-wider font-medium">Hey {auth?.currentUser?.displayName},</h2>
        <h3 className="text-2xl md:text-[26px] leading-[2rem] font-[arial] text-slate-700 font-medium mt-1.5">Thanks for the choosing BearCart</h3>
        <p className="text-sm tracking-wider text-slate-600 my-2 md:my-1">Your order was <span className="font-medium text-blue-700">successful</span>. Delivery of your product is within 3days-7days depending on the order processing</p>

        <article className="mt-8">
          {orders.reverse().slice(0,1).map(order=>{
            return <>
             <section>
              <h2 className="text-sm text-slate-600 tracking-wide">Order Reference:</h2>
              <h3 className="font-medium text-slate-700">{order[0]}</h3>
            </section>
            <hr className="my-5"/>
            <section className="w-[96vw] md:w-full -ml-4 overflow-x-hidden">
              <Slider  {...settings} className="ml-4 w-full p-2">
                {order[1]?.products.map(product=>{
                  return <>
                  <article  className="mt-2 grid grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                      <img src={product[1]?.url} alt="" className="rounded-md h-[150px] object-cover w-full"/>
                    </div>
                    <div className="my-2.5">
                      <h2 className="font-medium text-[18px] text-slate-700">{product[1]?.name}</h2>
                      <h3 className="text-sm text-blue-700 font-medium my-0.5">₦{product[1]?.price}</h3>
                      <h4 className="text-sm tracking-wide text-slate-600">Category: {product[1]?.brand}</h4>
                    </div>
                  </article>
                < hr className="my-5"/>

                  </>
                })}
                </Slider>
              < hr className="my-5"/>
            </section>
            <section className="grid grid-cols-2 lg:grid-cols-3 mx-3">
              <div className="flex flex-col">
                <h2 className="font-medium">Order Status</h2>
                <h3 className="text-blue-700 text-sm font-medium">Success</h3>
              </div>
              <div className="flex flex-col">
                <h2 className="font-medium">Payment Option</h2>
                <h3  className="text-blue-700 text-sm font-medium">{order[1]?.deliveryOption  === "door" ? "On Delivery": "Online"} Payment</h3>
              </div>
          </section>
          <hr className="my-5"/>
            </>
          })}
         

          <footer>
            <h2 className="text-right text-blue-700 font-medium text-sm hover:underline  transition-all"><Link to={"/"}>Continue Shopping &rarr;</Link></h2>
          </footer> 
        </article>
      </section>
    </main>
  )
}

export default OrderSuccess
