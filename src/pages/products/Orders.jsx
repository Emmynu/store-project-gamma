import { useState, useEffect } from "react"
import { getOrders } from "../../actions/products/orders"
import Slider from "react-slick"

const Orders = () => {
  const [orders, setOrders] = useState([])

  
  useEffect(()=>{
    getOrders(setOrders)

  },[])


  return (
    <main>
        <Slider>
            {orders.map(order=>{
            return <>
              <article>{order[1]?.products?.map(product=>{
                return<>
                  <section>
                    <img src={product[1]?.url} alt={product[0]}/>
                    <h2>{product[1]?.name}</h2>
                  </section>
                </>
              })}</article>
              <h3>{order[1]?.status}</h3>
              <h3>{order[1]?.deliveryOption}</h3>
            </>
          })}
        </Slider>
    </main>
  )
}

export default Orders
