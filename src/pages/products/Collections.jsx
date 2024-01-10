import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { id as userId } from "../../actions/auth/auth"
import { clearAllCollections, getCollection, removeProductFromCollection } from "../../actions/products/collections"
import emptyCollection from "../../images/fly.gif"
import CustomerSideBar from "../../components/sideBar"
import AOS from "aos"
import "aos/dist/aos.css"


const Collections = () => {
  const [collections, setCollections] = useState([])


  useEffect(()=>{
    getCollection(userId, setCollections)
  },[])

  useEffect(()=>{
    AOS.init()
  },[])

  return (
    <main className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-[72rem]  mx-3 md:mx-auto md:px-3 items-start  gap-9  my-3 lg:my-12"}>

      <section>
        <CustomerSideBar/>
      </section>
      <section className="flex flex-col gap-4 bg-white border drop-shadow-md rounded-[4px] col-span-3 lg:col-span-2 p-7" data-aos={"fade-up"} data-aos-duration={"900"}>
        <header className="flex justify-between pt-1 pb-3 border-b">
          <h2 className=" text-lg sm:text-xl font-medium">Saved Items</h2>
          <button className="text-blue-600 font-medium text-sm px-2 py-1 rounded-[4px] hover:bg-blue-100" onClick={()=>clearAllCollections(userId)}>Clear All</button>
        </header>
        {collections.length > 0  ? collections.map(item=>{
          return <article key={item[0]} className="border border-slate-300 flex gap-2 sm:gap-6 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]">

            <Link to={`/product/${item[1]?.productId}/${item[1]?.category}/${item[1]?.brand}`}>
              <section className="flex gap-2 sm:gap-6 cursor-pointer ">
                <div>
                  <img src={item[1].images} alt={item[1]?.name} className="h-[150px] w-[200px] object-cover" />
                </div>
                <div className="my-3.5"> 
                  <h2 className=" font-medium text-sm md:text-[18px] my-2">{item[1]?.name}</h2>
                  <h3 className="text-slate-600 tracking-wider mt-3 text-xs md:text-sm">₦{item[1]?.price}</h3>
                  <button className="bg-blue-100 my-2.5 px-3 py-1 rounded-[4px] text-blue-700 font-medium text-xs md:text-sm" onClick={()=>removeProductFromCollection(userId, item[0])}>Remove</button>
                </div>
              </section>
            </Link>
          </article>
          
        }) :
         <article className="flex flex-col  items-center text-center">
          <img src={emptyCollection} alt="collection-image" className="w-[300px]"/>
          <h2 className="font-medium text-slate-800 -mt-1.5 text-center">You haven't saved an item yet!</h2>
          <h4 className="my-2 text-xs tracking-wider md:text-sm">Found something you like? Tap on the heart shaped icon next to the item to add it to your wishlist! All your saved items will appear here.</h4>
          <Link to="/"><button className="bg-blue-700 px-5 py-1.5 rounded-[4px] text-white tracking-wider text-sm my-1.5">Continue Shopping</button></Link>
        </article>}
      </section>
     
    </main>
  )
}

export default Collections
