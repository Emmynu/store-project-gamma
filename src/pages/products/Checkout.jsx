import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCart, removeItemFromCart } from "../../actions/products/cart"
import "./products.css"
import { increment, ref, update,getDatabase } from "firebase/database"
import { id as userId } from "../../actions/auth/auth"
import { Toaster, toast } from "sonner"
import empty from "../../images/not-found.gif"


const Checkout = () => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState([])

  useEffect(()=>{
    getCart(setCart)
  },[])

  useEffect(()=>{
    cart.reduce((totalPrice, price)=>{
      totalPrice += price[1]?.price * (price[1]?.quantity)
      setTotal(totalPrice)
      return totalPrice
    },0)
    },[cart])

    function increaseQuantity(id) {
      cart.find(item =>{
        if (item[0] === id) {
          if(item[1].quantity < item[1].productQuantityAvailable ){
              const updates = {}
              updates[`cart/${userId}/${id}/quantity`] = increment(1)
              return update(ref(getDatabase()), updates)
          }
        }
      })
    }
    
    
    function decreaseQuantity(id) {
      cart.find(item =>{
        if(item[0] === id){
          if (item[1]?.quantity > 1) {
            const updates = {}
            updates[`cart/${userId}/${id}/quantity`] = increment(-1)
            return update(ref(getDatabase()), updates)
          }else{
            toast.error("Quantity cant be less than 1")
          }
        }
      })
    
    }


  return (
    <main className="py-5 md:py-12 lg:py-20 mx-4 md:mx-8 lg:mx-auto max-w-[72rem] checkout-container" >
      <header>
        <h2 className="border-b border-base-300 pb-5 text-3xl font-bold text-slate-600 tracking-wider">Shopping Cart</h2>
      </header>

      <main className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {cart.length > 0 ? cart.map(item=>{
            return <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
              <img src={item[1]?.url} alt="" className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" />
              <div className="sm:ml-16 sm:w-48">
                <h2 className="capitalize font-medium">{item[1]?.name}</h2>
                <h4 className="mt-2 capitalize text-sm text-slate-600 tracking-wider">₦{item[1]?.price}</h4>
              </div>
              <div className="sm:ml-12">
               <h2>Quantity</h2>
               <div className="flex items-center">
                <button onClick={()=>decreaseQuantity(item[0])} className="text-xl text-slate-700 font-bold mr-1.5">&#9866;</button>
                <p className="text-slate-700 text-xl font-bold">{item[1]?.quantity}</p>
                <button onClick={()=>increaseQuantity(item[0])} className="text-xl text-slate-700 font-bold ml-1.5">&#10011;</button>
               </div>
                <button className="text-blue-600 text-sm tracking-wider hover:underline cursor-pointer" onClick={()=>removeItemFromCart(item[0])}>remove</button>
              </div>
            </article>
          }):  <section className="flex justify-center border-dotted rounded-lg flex-col items-center border-[2px] bg-blue-50 pb-8 md:pb-5 m-0">
                  <img src={empty} alt="" className="-mt-8 md:-mt-12 w-[300px] md:w-fit"/>
                  <h2  className="font-medium  text-slate-800 -mt-8 mb-1.5 text-center">Sorry! Your Cart is empty</h2>
                  <Link to="/"><button className="bg-blue-700 px-5 py-1.5 rounded-[4px] text-white tracking-wider text-sm my-1.5">Continue Shopping</button></Link>
            </section>}
        </div>
        <section className="lg:col-span-4 lg:pl-4 flex flex-col h-fit">
            <div className=" bg-base-200 p-[2rem] py-[3rem] bg-blue-50 rounded-2xl">
              <p className="flex justify-between text-xs border-b border-base-300 pb-2 my-2.5">
                <span>Shipping Fee</span>
                <span>₦0</span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2 my-2.5">
                <span>Fee</span>
                <span>₦100</span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2 my-2.5">
                <span>Subtotal</span>
                <span>₦{total}</span>
              </p>
              <h2 className="flex justify-between text-base font-medium"><span>Total</span> <span>₦{total + 100}</span></h2>
            </div>
          <button className="bg-blue-700 text-white font-bold tracking-wider my-2.5 px-4 py-1.5 rounded-[4px]">{cart.length > 0 ?  <span>Checkout</span> : <Link to={"/"}>Checkout</Link>}</button>
          </section>
      </main>
      <Toaster richColors closeButton position="top-right"/>
    </main>
  )
}

export default Checkout
