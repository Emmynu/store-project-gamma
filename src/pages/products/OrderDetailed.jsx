import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import getSingleOrder from "../../actions/products/orders";
import CustomerSideBar from "../../components/sideBar";
import Moment from "react-moment"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { settings } from "../sellers/Products";
import { auth } from "../../firebase-config";

const OrderDetailed = () => {
  const { id } = useParams()
  const [orders, setOrders] = useState(null)

  useEffect(()=>{
    getSingleOrder(setOrders, id)
  },[])

  // console.log(orders)
  console.log(orders?.address?.address);
    {return orders !== null  && <main className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-[72rem]  mx-3 md:mx-auto md:px-3 items-start  gap-9  my-3 lg:my-12"}>
      <section>
         <CustomerSideBar />
      </section>
      <section className="flex flex-col gap-4 bg-white border drop-shadow-md rounded-[4px] col-span-3 lg:col-span-2 px-3.5 md:px-7 py-4 " data-aos={"fade-up"} data-aos-duration={"900"}>
        <header className="flex justify-between pt-1 pb-3 border-b">
          <h2  className=" text-xl font-medium">Order Details</h2>
        </header>
        <main>
          <article>
            <h3 className="text-[15px]  my-1.5 tracking-wider text-slate-700">Order hash: {id}</h3>
            <h4 className="text-sm  tracking-wider text-slate-600 mb-1">{orders !== null && `${orders?.products.length } Items`} </h4>
            <h5 className="text-slate-600 tracking-wider text-sm my-1">Delivery Option: {orders?.deliveryOption}</h5>
          </article>
          <hr className= "my-4" />
          <section className="border p-4 rounded-[4px]"> 
            <Slider>
              {orders?.products.map(product =>{
                return <article>
                  <header className="flex items-center mb-3">
                    <h2 className="px-2 py-1 bg-green-600 text-white uppercase text-xs tracking-wideest rounded-[4px] mr-2">{orders.status}</h2>
                    <h4 className="text-sm tracking-wider"><Moment fromNow>{orders?.createdOrder}</Moment></h4>
                  </header>
                  <main className="grid grid-cols-2 md:grid-cols-3 ">
                    <section>
                      <Slider {...settings}>
                        {product[1]?.url?.map(img=>{
                        return <img src={img} alt={product[0]} className="h-[150px] w-full object-cover"/>
                      })}</Slider>
                    </section>
                    <section className="md:col-span-2 ml-5 my-2.5">                   
                      <h3 className="text-lg font-medium text-slate-700">{product[1]?.name}</h3>
                      <h3 className="text-slate-600 tracking-wider my-1">QTY: {product[1]?.quantity}</h3>
                      <h3 className="text-slate-600 tracking-widest text-sm my-1" >₦{product[1]?.price}</h3>
                    </section>

                   
                  </main>
                  
                </article>
              })}
            </Slider>
          </section>

          <section className="border border-slate-300 rounded-[4px] mt-4 w-full">
            <h3 className="font-medium border-b border-slate-200  p-4 uppercase text-slate-700">Delivery Information</h3>
            <article className=" p-4  ">
              <div className="my-3">
                <h3 className="font-medium text-slate-700">Delivery Method</h3>
                <p className="text-sm text-slate-600 tracking-wider">{orders?.deliveryOption}</p>
              </div>
              <div className="my-3">
                <h3 className="font-medium text-slate-700">Shipping Address</h3>
                <p className="text-sm text-slate-600 tracking-wider flex flex-col mt-1">
                  <span className="my-1">{auth?.currentUser?.displayName}</span>
                  <span className="my-1">{orders?.address?.address?.address}</span> 
                  <span className="my-1">{`${orders?.address?.address.city}(${orders.address?.address.states}) ${orders?.address?.address?.phone}`}</span>
                </p>
              </div>
            </article>
          </section>

        </main>
      </section>
      </main> }
  
}

export default OrderDetailed
