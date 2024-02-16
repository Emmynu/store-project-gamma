import { useParams } from "react-router-dom"
import CustomerSideBar from "../../components/sideBar"
import { useEffect, useState } from "react"
import getSingleOrder from "../../actions/products/orders"
import Moment from "react-moment"

const TrackOrder = () => {
  const { id } = useParams()
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    getSingleOrder(setOrders, id)
  },[id])

  console.log(orders?.products);

  const pendingOrder  = orders?.products !== undefined && orders?.products.filter(product=>product?.status === "pending")
  const cancelledOrder  =  orders?.products !== undefined &&orders?.products.filter(product=>product?.status === "Cancelled")
  const deliveredOrder  =  orders?.products !== undefined && orders?.products.filter(product=>product?.status === "Delivered")

  return (
    <main className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-[72rem]  mx-3 md:mx-auto md:px-3 items-start  gap-9  my-3 lg:my-12"}>
       <section>
         <CustomerSideBar />
      </section>
      <section  className="flex flex-col gap-4 bg-white border drop-shadow-md rounded-[4px] col-span-3 lg:col-span-2 px-3.5 md:px-7 py-4 " data-aos={"fade-up"} data-aos-duration={"900"}>
        <header className="flex justify-between pt-1 pb-3 border-b">
            <h2  className=" text-xl font-medium">Package History</h2>
        </header>

        <main>
          <section className="flex ">
            <div className="flex flex-col items-center">
              <h3 className="text-white bg-blue-700 py-0.5 px-2 rounded-[50%]">&#x2713;</h3>
              <div className="bg-blue-700 w-[5px] h-[45px]"></div>
            </div>
            <div className="ml-3 mt-1">
              <h3 className="bg-blue-700 text-white uppercase text-xs w-fit p-1 tracking-wide">Placed Order</h3>
              <Moment className="text-[12px] text-slate-600 tracking-wider">{orders?.createdOrderAt}</Moment>
            </div>
          </section>
          <section className="flex ">
            <div className="flex flex-col items-center">
                <h3 className="text-white bg-yellow-500 py-0.5 px-2   rounded-[50%]">&#x2713;</h3>
                <div className="bg-yellow-500 w-[5px] h-[45px]"></div>
              </div>
              <div className="ml-3 mt-1">
                <h3  className="bg-yellow-500 text-white uppercase text-xs w-fit p-1 tracking-wide">{pendingOrder.length} Product Pending</h3>
                <Moment className="text-[12px] text-slate-600 tracking-wider">{orders?.createdOrderAt}</Moment>
              </div>
          </section>

          <section  className="flex">
            <div className="flex flex-col items-center">
              <h3 className="text-white bg-red-600 py-0.5 px-2  rounded-[50%]">&#x2713;</h3>
              <div className="bg-red-600 w-[5px] h-[45px]"></div>
            </div>
            <div className="ml-3 mt-1">
              <h3 className="bg-red-600 text-white uppercase text-xs w-fit p-1 tracking-wide">{cancelledOrder.length} Product Cancelled</h3>
              <Moment className="text-[12px] text-slate-600 tracking-wider">{orders?.createdOrderAt}</Moment>
            </div>
          </section>

          <section className="flex">
            <div className="flex flex-col items-center">
              <h3 className="text-white bg-green-600 py-0.5 px-2  rounded-[50%]">&#x2713;</h3>
              <div className="bg-green-600 w-[5px] h-[30px]"></div>
            </div>
            <div className="ml-3 mt-1">
              <h3 className="bg-green-600 text-white uppercase text-xs w-fit p-1 tracking-wide">{deliveredOrder.length} Product Delivered</h3>
              <Moment className="text-[12px] text-slate-600 tracking-wider">{orders?.createdOrderAt}</Moment>
            </div>
          </section>
         
        </main>
      </section>
    </main>
  )
}

export default TrackOrder
