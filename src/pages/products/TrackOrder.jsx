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
          <section className="flex items-center ">
            <div>
              <h3>&#x2713;</h3>
            </div>
            <div className="ml-3 mt-2">
              <h3>Placed Order</h3>
              <Moment>{orders?.createdOrderAt}</Moment>
            </div>
          </section>
          <section>
            <h3>{pendingOrder.length} Product Pending</h3>
            <Moment>{orders?.createdOrderAt}</Moment>
          </section>

          <section>
            <h3>{cancelledOrder.length} Product Cancelled</h3>
            <Moment>{orders?.createdOrderAt}</Moment>
          </section>

          <section>
            <h3>{deliveredOrder.length} Product Delivered</h3>
            <Moment>{orders?.createdOrderAt}</Moment>
          </section>
         
        </main>
      </section>
    </main>
  )
}

export default TrackOrder
