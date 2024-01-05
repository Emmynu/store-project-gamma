import { useEffect, useState } from "react"
import { getProducts } from "../../actions/products/products"
import { auth } from "../../firebase-config"
import pending from "../../images/pending.png"
import completed from "../../images/completed.png"
import product from "../../images/products.png"
import AOS from "aos"
import "aos/dist/aos.css"

const Stats = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getProducts(setIsLoading, setProducts)
  },[])

  useEffect(()=>{
    AOS.init()
  },[])


  const filteredProducts = products.filter(product=> product[1]?.createdBy?.id === auth?.currentUser?.uid)
  

  return (
    <main className="mt-32 mb-[1000px]"  data-aos={"fade-up"} data-aos-duration={"900"}>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-7 sm:gap-12 mx-3 md:mx-9">

        <div className="bg-white shadow-md shadow-slate-200 border drop-shadow-md rounded-md p-9 border-b-[7px] border-yellow-600"  data-aos={"fade-left"} data-aos-duration={"900"}>
          <header className="flex items-center justify-between">
            <h2 className="text-3xl text-yellow-600 font-bold">20</h2>
            <div className=" p-3 rounded-[4px] bg-orange-100"><img className="w-7" src={pending} alt="pending"/></div>
          </header>
          <footer>
            <h2 className="mt-3 text-lg tracking-wider">Pending Orders</h2>
          </footer>
        </div>

        <div className="bg-white shadow-md shadow-slate-200 border  rounded-md p-9 drop-shadow-md border-b-[7px] border-green-600"  data-aos={"fade-left"} data-aos-duration={"1100"}>
          <header className="flex items-center justify-between">
            <h2 className="text-3xl text-green-600 font-bold">40</h2>
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

      <section className="text-center mt-20 ">
        <h2 className="text-2xl sm:text-[25px] leading-3 text-slate-700 font-medium font-[arial] tracking-wide">All Orders</h2>
      </section>
    </main>
  )
}

export default Stats
