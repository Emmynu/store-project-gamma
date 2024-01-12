import { useState, useEffect } from "react"
import { getSingleUserFromDb, id as userId } from "../../actions/auth/auth"
import { getDatabase, push, ref, remove, serverTimestamp, set, update } from "firebase/database"
import { getCart } from "../../actions/products/cart"
import { createOrder, getAllVendors } from "../../actions/products/orders"
import { db,auth } from "../../firebase-config"
import { usePaystackPayment } from "react-paystack"
import { getProducts, updateQuantity } from "../../actions/products/products"
import { toast, Toaster } from "sonner"
import { OrderOptionsLoading } from "../../components/Loading"
import load from "../../images/load.png"

const OrderOptions = () => {
  const [address, setAddress] =  useState([])
  const [cart, setCart] =  useState([])
  const [products, setProducts] =  useState([])
  const [vendors, setVendors] =  useState([])
  const [states, setStates] =  useState([])
  const [deliveryOption, setDeliveryOption] = useState("")
  const [isFetching, setIsFetching] =  useState(false)
  const [isLoading, setIsLoading] =  useState(false)
  const [isError, setIsError] =  useState(false)
  const [isModalOpen, setIsModalOpen] =  useState(false)
  const [newAddress, setNewAddress] = useState({state: "", address: "", phone: 0})
  const [amount, setAmount] = useState(0)
  const [id, setid] = useState(0)

  const paymentConfig = {
    reference : `${new Date().getFullYear()}${new Date().getTime().toString()}`,
    email: auth?.currentUser?.email,
    amount: amount * 100,
    publicKey: 'pk_test_c2484e2d160a0c13c7b439e82b1e07f0334fb022',
  }

  const initializePayment = usePaystackPayment(paymentConfig)

  useEffect(()=>{
    getSingleUserFromDb(userId, setAddress, setIsFetching)
    getProducts(setIsFetching, setProducts)
    getCart(setCart)
    getAllVendors(setVendors)
  },[])


  useEffect(()=>{
    cart.reduce((total,price)=>{
      total +=( price[1]?.price * price[1]?.quantity) 
      setAmount(total + 600)
      return total
    },0)

  },[cart])

  const border={
    border: "1px solid #f0f0f0"
  }
  async function fetchStates() {
    await fetch( 'https://nga-states-lga.onrender.com/fetch')
      .then(res=>res.json())
      .then(res=>setStates(res))
      .then(setIsError(false))
      .catch(err=>{
        setIsError(true)
      })
  }

  useEffect(()=>{
    fetchStates(setStates)
  },[])

  if(isFetching){
    return <OrderOptionsLoading />
  }

  function updateAddress(id){
    setIsModalOpen(!isModalOpen)
    setid(id)
  
  }
  function updateUserAddress() {
    setIsLoading(true)
    if(newAddress.address && newAddress.state){
      const updates = {}
      updates[`users/${userId}/${id}/address`] = `${newAddress.address} | ${newAddress.state} | ${newAddress.phone}`
      update(ref(getDatabase()), updates).then(res=>{
        setIsLoading(false)
        setIsModalOpen(false)
        setNewAddress({phone: "", state:"", address:""})
      })
     }
  }


function handleInput(e){
  const { name, value } = e.target
  setNewAddress(prev => {
    return {...prev,  [name]: value}
  })
}


function order() {
  const orderId = new Date().getTime().toString()
  createOrder(orderId, { 
    products: cart,
    status:"pending",
    createdOrder: serverTimestamp(),
    deliveryOption
  }).then(request=>{
    cart.map(item=>{
      vendors.map(vendor=>{
        if(item[1]?.createdBy === vendor){
          push(ref(db, `vendors/${vendor}/orders`),{
            products:item[1],
            orderRef: orderId,
            createdAt: serverTimestamp()
          }).then(products.map(product=>{
            if(product[0] === item[1]?.productId){
              updateQuantity(product[0], item[1]?.quantity)
            }
          }))
        }
      })
    })
  }).then(res=>{
    remove(ref(db, `cart/${id}`)).then(window.location = "/order/success")
  }).catch(err=>{
    toast.error(err.message)
  })
}

function onSuccess(){
  order()
}


function finalizeOrder() {
  if(deliveryOption === "door" && cart.length > 0){
    order()
  }
  else if(deliveryOption === "online"  && cart.length > 0){
     initializePayment({onSuccess})
  }
  else if(cart.length <= 0){
    window.location = "/"
  }
  else{
    toast.error("Please select a delivery option")
  }
}


  return (
    <>
    <main className="grid grid-cols-3 lg:grid-cols-4 gap-10 items-start max-w-[72rem] mx-3 lg:mx-auto mt-8">
    <section className="col-span-3 ">
      <header className="bg-white shadow-md border p-4">
        <>{address.map(place =>{
          return <article>
            <header className="flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-white bg-green-700 rounded-[50%] px-1 text-sm">✓</h2>
                <h3 className="ml-1.5 font-medium uppercase text-slate-700">1. Customer Address</h3>
              </div>
              <div><button onClick={()=>updateAddress(place[0]) || "No Address Found"} className="text-sm text-blue-700 tracking-wider" >Change</button>  </div>
            </header>
            <hr className="my-2"/>
            <main>
              <h5 className="text-slate-700 font-medium ">{auth?.currentUser?.displayName}</h5>
              <h6 className="text-sm tracking-wider text-slate-600">{place[1]?.address}</h6>
            </main>
          </article>
        })}</>
      </header>
      <section className="bg-white shadow-md border p-4 mt-4">
        <header>
          <div className="flex items-center">
            <h2 className="text-white bg-green-700 rounded-[50%] px-1 text-sm">✓</h2>
            <h3 className="ml-1.5 font-medium uppercase text-slate-700">2. Delivery Option</h3>
          </div>
        </header>
        <hr className="my-2"/>

       <div>
        <article className="my-5 flex justify-between  p-2" style={deliveryOption === "door" ? border : null}>
            <div><h2 className="text-[15px] font-medium tracking-wide">Door Delivery</h2>
            <p className="text-sm text-slate-600 tracking-wider my-1.5">Delivery of item is between (3days to 1week)</p></div>
            <div><button onClick={()=>setDeliveryOption("door")} className="text-blue-700 text-sm tracking-wider">Select</button></div>
          </article>

          <article className="my-5  flex justify-between p-2" style={deliveryOption === "online" ? border : null}>
            <div><h2 className="text-[15px] font-medium tracking-wide">Online Payment</h2>
            <p className="text-sm text-slate-600 tracking-wider my-1.5">Delivery of item is between (3days to 1week)</p></div>
           <div> <button onClick={()=>setDeliveryOption("online")} className="text-blue-700 text-sm tracking-wider">Select</button></div>
          </article>
       </div>

      </section>
      </section>
      <section className="col-span-3 border lg:col-span-1 bg-white shadow-md rounded-md p-4">
       <header>
          <h3 className="font-medium text-base p-1 text-slate-700">Order Summary</h3>
        </header>
        <hr className="my-2"/>
        <main>
          <article>
            <div className="flex items-center justify-between my-2">
              <h2 className="text-[15px] tracking-wider text-slate-700">item's total ({cart.length})</h2>
              <h3 className="font-medium text-slate-600 text-sm">₦{amount - 600}</h3>
            </div>
            <div className="flex items-center justify-between my-2">
              <h2 className="text-[15px] tracking-wider text-slate-700">Additional Fees</h2>
              <h3 className="font-medium text-slate-600 text-sm">₦{600}</h3>
            </div>
             <hr className="my-2"/>    
            <div className="flex items-center justify-between my-2">
            <h2 className="font-medium">Total</h2>
            <h4 className="font-medium text-slate-600 text-[15px]">₦{amount}</h4>
            </div>
          </article>
          <hr className="my-2"/>
          <button onClick={finalizeOrder} className="bg-blue-700 w-full mt-2 px-4 py-1.5 rounded-[4px] text-white font-medium text-center">Confirm Order</button>

        </main>
      </section>
       {/* Modal */}
    { isModalOpen &&  <section  className="w-11/12 md:w-6/12 lg:w-1/3 p-5 absolute top-48 left-[50%] translate-x-[-50%] bg-white shadow-slate-100 border border-blue-600 outline-none rounded-mdx shadow-md ">
      <h3 className="text-center font-[arial] font-medium text-[22px] text-slate-700">Update Address</h3>
    {!isError ? <>   <select onChange={handleInput} name="state" className="px-2 py-1 my-1.5 w-full border border-slate-700 text-slate-600  text-sm tracking-wider  rounded-[3px]">{states.map(state=>{
          return <option value={state}>{state}</option>
        })}</select> 
        <div className="flex items-center justify-center mt-1.5">
          <input className="px-2 py-1 border border-slate-700 rounded-[3px] outline-none text-slate-600 w-full text-sm tracking-wider" type="text" onChange={handleInput} name="address" value={newAddress.address} placeholder="Address"/>
          <input className="px-2 py-1 border border-slate-700  ml-2 rounded-[3px]  outline-none text-slate-600 w-full text-sm tracking-wider" type="number" onChange={handleInput} name="phone" value={newAddress.phone} placeholder="Phone Number"/>
        </div>
        <button className="bg-blue-700 px-5 py-2 rounded-[4px] w-full mt-3 tracking-wider  flex justify-center items-center text-white font-medium" onClick={updateUserAddress} disabled={isLoading}>{isLoading ? <img src={load} className="w-5 animate-spin"/> :"Update Address"}</button></>: <section className="text-center my-5 text-slate-600 tracking-wider">
            <h4>Failed to fetch states</h4>
          </section>}
      </section>} 
    </main> 
    <Toaster richColors closeButton position="top-right"/>
    </>
  )
}

export default OrderOptions
