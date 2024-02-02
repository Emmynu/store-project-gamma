import { useState, useEffect } from "react"
import { getSingleUserFromDb, id as userId } from "../../actions/auth/auth"
import { getDatabase, push, ref, remove, serverTimestamp,  update } from "firebase/database"
import { getCart } from "../../actions/products/cart"
import { createOrder, getAllVendors, saveVendorOrder } from "../../actions/products/orders"
import { db,auth } from "../../firebase-config"
import { usePaystackPayment } from "react-paystack"
import { getProducts, updateQuantity } from "../../actions/products/products"
import { toast, Toaster } from "sonner"
import { OrderOptionsLoading } from "../../components/Loading"
import load from "../../images/load.png"
import Modal from "react-modal"

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
  const [newAddress, setNewAddress] = useState({state: "", address: "", phone: 0, city: ''})
  const [lga, setLga] = useState([])
  const [amount, setAmount] = useState(0)
  const [id, setid] = useState(0)
  let subtitle;


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
    try{
      const data = await fetch("https://nga-states-lga.onrender.com/fetch")
      const states = await data.json()
      setStates(states)
    }
    catch(err){
      setIsError(true)
    }
  }

  async function fetchLocalGovernments(state) {
      try{
      const data = await fetch(`https://nga-states-lga.onrender.com/?state=${state}`)
      const states = await data.json()
      setLga(states)
    }
    catch(err){
      setIsError(true)
    }
  }


  useEffect(()=>{
    fetchStates(setStates)
  },[])

  useEffect(()=>{
     if(newAddress.state){
      fetchLocalGovernments(newAddress.state)
    }
  },[newAddress.state])





  if(isFetching){
    return <OrderOptionsLoading />
  }

  function updateAddress(id){
    setIsModalOpen(!isModalOpen)
    setid(id)
  }

  function closeModal(){
    setIsModalOpen(false)
    setIsLoading(false)
    setNewAddress({address:"",city:"", state:"",phone:""})
  }

  function updateUserAddress() {
    setIsLoading(true)
    if(newAddress.address && newAddress.state && newAddress.city && newAddress.phone){
      const updates = {}
      updates[`users/${userId}/${id}/address`] = {
        phone: newAddress.phone,
        address: newAddress.address,
        states: newAddress.state,
        city: newAddress.city
      }
      update(ref(getDatabase()), updates).then(res=>{
        setIsLoading(false)
        setIsModalOpen(false)
        setNewAddress({phone: "", state:"", address:"", city : ""})
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
  const orderProduct = cart.map(item=> item[1])

  
  createOrder(orderId, {
    products:orderProduct,
    status: "pending", // for the whole order
    createdOrderAt: serverTimestamp(),
    paymentOption: deliveryOption,
    address: address[0][1],
  })
  .then(res =>{
    cart.map(item=>{
      vendors.map(vendor=>{
        if(item[1]?.createdBy === vendor){
          saveVendorOrder(vendor, orderId, {
            products:item[1],
            createdAt:serverTimestamp(), 
            orderedBy: auth?.currentUser?.uid
          }).then(products.map(product=>{
            if(product[0]===item[1]?.productId){
                updateQuantity(product[0])
            }
          }))
        }
      })
    })
  })
  .then(res =>{
    remove(ref(db, `cart/${userId}`))
    .then(window.location = "/order/success")
  }).catch(err=>toast.error(err.message))
}

function onSuccess(){
  order()
}


function finalizeOrder() {
  if(deliveryOption === "On-Delivery" && cart.length > 0 && address[0][1]?.address){
    order()
  }
  else if(deliveryOption === "Online-Payment"  && cart.length > 0 && address[0][1]?.address){
     initializePayment({onSuccess})
  }
  else if(cart.length <= 0 && address[0][1]?.address){
    window.location = "/"
  }
  else if(!address[0][1]?.address){
    toast.info("No Address Found! Click 'change' button to add address")
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
                <h3 className="ml-1.5 font-medium uppercase text-sm md:text-base text-slate-700">1. Customer Address</h3>
              </div>
              <div><button onClick={()=>updateAddress(place[0])} className="text-sm text-blue-700 tracking-wider" >Change</button>  </div>
            </header>
            <hr className="my-2"/>
            <main>
              <h5 className="text-slate-700 font-medium ">{auth?.currentUser?.displayName}</h5>
             {address[0][1]?.address ?  <h6 className="text-sm tracking-wider text-slate-600">{`${place[1]?.address?.states} | ${place[1]?.address?.city} | ${place[1]?.address?.address} | ${place[1]?.address?.phone}`}</h6>: <h3 className="text-sm tracking-wider text-slate-600">No Address Found </h3>}
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
        <article className="my-5 flex justify-between  p-2" style={deliveryOption === "On-Delivery" ? border:null}>
            <div><h2 className="text-[15px] font-medium tracking-wide">Door Delivery</h2>
            <p className="text-sm text-slate-600 tracking-wider my-1.5">Delivery of item is between (3days to 1week)</p></div>
            <div><button onClick={()=>setDeliveryOption("On-Delivery")} className="text-blue-700 text-sm tracking-wider">Select</button></div>
          </article>

          <article className="my-5  flex justify-between p-2" style={deliveryOption === "Online-Payment" ? border:null }>
            <div><h2 className="text-[15px] font-medium tracking-wide">Online Payment</h2>
            <p className="text-sm text-slate-600 tracking-wider my-1.5">Delivery of item is between (3days to 1week)</p></div>
           <div> <button onClick={()=>setDeliveryOption("Online-Payment")} className="text-blue-700 text-sm tracking-wider">Select</button></div>
          </article>
       </div>

      </section>
      </section>
      <section className="col-span-3 border lg:col-span-1 bg-white shadow-md rounded-md p-4">
       <header>
          <h3 className="font-medium  p-1 text-slate-700 text-base">Order Summary</h3>
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
    { isModalOpen &&  <Modal isOpen={isModalOpen}  className="w-11/12 md:w-6/12 lg:w-1/3 p-5 absolute top-48 left-[50%] translate-x-[-50%] bg-white shadow-slate-100 border border-blue-600 outline-none rounded-mdx shadow-md ">
    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
      {/* close btn */}
      {!isError ? <article>
        <button className="text-base font-medium text-red-700  tracking-widest " onClick={closeModal}>
          <div className="sm-bar w-[20px] sm-bar-1"></div>
          <div className="sm-bar w-[20px] sm-bar-2"></div>
        </button>
        <section>
          <h3 className="text-[27px] font-medium text-slate-800 my-2.5">Update Address</h3>
          <article>
            <div className="flex items-center ">
              <select className="border w-full py-1 border-slate-700 rounded-[4px] px-3 text-sm text-slate-600" onChange={handleInput} name="state" >{states.map(state=>{
                return <option value={state}>{state}</option>
              })}</select>
            
              {newAddress.state && <select className="border w-full py-1 ml-2 border-slate-700 rounded-[4px] px-3 text-sm text-slate-600" onChange={handleInput} name="city">
                    {lga.map(lg=>{
                      return <option value={lg}>{lg}</option>
                    })}
                    </select>}
              </div>
              <div className="flex items-center my-2">
                <input className="border w-full border-slate-700 py-1 rounded-[4px] px-2 my-1.5 ml-1" type="text" name="address" onChange={handleInput} value={newAddress.address} placeholder="Address"/>
                  <input className="border w-full border-slate-700 py-1 rounded-[4px] px-2 my-1.5 ml-1" type="number" name="phone" onChange={handleInput} value={newAddress.phone} placeholder="Phone Number"/>
              </div>
                <button onClick={updateUserAddress} className="bg-blue-700 py-1.5 w-full px-3 rounded-[4px] text-white flex justify-center items-center text-sm ">{isLoading ? <div className="flex items-center justify-center">
                  <img src={load} className="w-5 animate-spin ml-1"/>
                  <h2>Loading...</h2>
                </div> :"Update Address"}</button>
          </article>
        </section>
      </article>
      :
      
      <section>
        <h3>Failed to Fectch states</h3>  
      </section>}



      </Modal>} 
    </main> 
    <Toaster richColors closeButton position="top-right"/>
    </>
  )
}

export default OrderOptions
