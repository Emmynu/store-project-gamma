import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getRefunds, updateRefundStatus } from '../../actions/products/orders'
import { LoadVendorProducts } from '../../components/Loading'
import Slider from 'react-slick'
import { settings } from './Products'
import refundIcon from "../../images/refund-2.png"
import allProduct from "../../images/all-products.png"
import empty from "../../images/notFound.png"

 

const Refund = () => {
  const [refunds, setRefunds] = useState([])
  const [isLoading, setIsLoading] = useState([])

  useEffect(() => {
    getRefunds(setRefunds, setIsLoading)
  },[])

  console.log(refunds);

  return (
    <main className='mt-32'>
      <header>
        <h2 className="text-2xl text-center  sm:text-[25px] leading-3 text-slate-700 font-medium font-[arial] tracking-wide">All Refunds</h2>
      </header>
      <section className='mt-7'>
          {isLoading ?  <LoadVendorProducts /> : <main>
            {refunds.length > 0 ? 
            <section  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 md:mx-7 lg:mx-12 mt-4">
              {refunds.map(refund=>{
                console.log(refund[0])
                return <article className="bg-white shadow-lg hover:shadow-3xl rounded-md transition-[3s] cursor-pointer " >
                <Slider {...settings}>
                  {refund[1]?.products?.map(product=>{
                      return <section >
                          <div>
                            <Slider {...settings}>
                              {product?.url?.map(img => {
                                return <img src={img} alt="" className="w-full h-[200px] object-cover" />
                              })}
                            </Slider>
                          </div>
                          <article className="p-3 pb-1.5 mt-2 flex items-center justify-between">
                            <section>
                              <h2 className="text-slate-700 font-medium my-1 sm:text-lg">{product?.name}</h2>
                              <h3 className="text-sm text-blue-700 tracking-wider my-1">₦{refund[1]?.amount}</h3>

                              <div className="my-1.5 text-[13px] tracking-wider text-slate-600 flex items-center">
                                <img src={refundIcon} alt="" className="w-4 mr-1"/>
                                <h3 className='text-xs tracking-wider text-slate-600'>{refund[1]?.type}</h3>
                              </div>
                            </section>
                            <section className='mt-3'>
                             <h3 className="bg-blue-100 shadow-md px-2 py-1.5 tracking-wider  text-blue-700 text-xs">{refund[1]?.status}</h3>

                             <div className="my-1.5 text-[13px] tracking-wider text-slate-600 flex items-center mt-3 ml-1">
                                <img src={allProduct} alt="" className="w-4 mr-1"/>
                                <h3 className='text-xs tracking-wider text-slate-600'>{product?.brand}</h3>
                              </div>

                             
                            </section>
                          </article>

                          <footer>
                            <button className="ml-3 shadow px-4 py-1 text-blue-700 bg-blue-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide" onClick={()=>updateRefundStatus(refund[0], "Refunded")}>Refund</button>

                            <button className="ml-3 shadow px-4 py-1 text-red-800 bg-red-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide" onClick={()=>updateRefundStatus(refund[0], "Cancelled")}>Cancel</button>
                            </footer>
                      </section>
                    })}
                </Slider>
                </article>
              })}   
            </section>
            
            : 
            
            <section className="mt-6 flex flex-col items-center justify-center">
            <img src={empty} alt="empty" />
            <h3 className="text-slate-700 text-center tracking-wide font-medium -mt-6">Fortunately, No Refund Found</h3>
            <button className="px-4 py-1.5 rounded-[4px] bg-blue-700 font-normal my-4 text-sm text-white tracking-wider "><Link to={"/admin"}>View Orders</Link></button>
          </section>}
            </main>}
      </section>
    </main>
  )
}

export default Refund
