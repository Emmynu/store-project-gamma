import { useState, useEffect } from "react"
import { getSingleUserFromDb, id as userId } from "../../actions/auth/auth"
import { getDatabase, push, ref, serverTimestamp, update } from "firebase/database"
import { getCart } from "../../actions/products/cart"
import { createOrder, getAllVendors } from "../../actions/products/orders"
import { db,auth } from "../../firebase-config"
import { usePaystackPayment } from "react-paystack"


const OrderOptions = () => {
  const [address, setAddress] =  useState([])
  const [cart, setCart] =  useState([])
  const [vendors, setVendors] =  useState([])
  const [states, setStates] =  useState([])
  const [deliveryOption, setDeliveryOption] = useState("")
  const [isFetching, setIsFetching] =  useState(false)
  const [isError, setIsError] =  useState(false)
  const [newAddress, setNewAddress] = useState({state: "", address: "", phone: 0})
  const [amount, setAmount] = useState(0)

  const paymentConfig = {
    reference : `${new Date().getFullYear()}${new Date().getTime().toString()}`,
    email: auth?.currentUser?.email,
    amount: amount * 100,
    publicKey: 'pk_test_c2484e2d160a0c13c7b439e82b1e07f0334fb022',
  }

  console.log(amount)
  const initializePayment = usePaystackPayment(paymentConfig)

  useEffect(()=>{
    getSingleUserFromDb(userId, setAddress, setIsFetching)
  },[])

  useEffect(()=>{
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


  function updateAddress(id){
   if(newAddress.address && newAddress.state){
    const updates = {}
    updates[`users/${userId}/${id}/address`] = `${newAddress.address} | ${newAddress.state} | ${newAddress.phone}`
    update(ref(getDatabase()), updates)
   }
  }


function handleInput(e){
  const { name, value } = e.target
  setNewAddress(prev => {
    return {...prev,  [name]: value}
  })
}

function order() {
  createOrder({ 
    products: cart,
    status:"pending",
    createdOrder: serverTimestamp(),
    deliveryOption
  }).then(res=>{
    cart.map(item=>{
      vendors.map(vendor=>{
        if(item[1]?.createdBy === vendor){
          push(ref(db, `vendors/${vendor}/orders`),{
            products:item[1]
          })
        }
      })
    })
  })
}

function onSuccess(){
  order()
}


function finalizeOrder() {
  if(deliveryOption === "door"){
    order()
  }
  else{
     initializePayment({onSuccess})
  }
}


  return (
    <main>
      <header>
        <h2>{address.map(place =>{
          return <article>
            <span>{place[1]?.address}</span>
             <button onClick={()=>updateAddress(place[0]) || "No Address Found"}>Change Address</button>  
          </article>
        })}</h2>
      </header>

      <section>
        <article >
          <h2>Door Delivery</h2>
          <p>Delivery is from (3days to 1week)</p>
          <button onClick={()=>setDeliveryOption("door")}>Select</button>
        </article>

        <article>
          <h2>Online Payment</h2>
          <p>Delivery is from (3days to 1week)</p>
          <button onClick={()=>setDeliveryOption("online")}>Select</button>
        </article>

        <button onClick={finalizeOrder}>Confirm Order</button>
      </section>
      {/* Modal */}
      <section>
       {(states && !isError) && <select onChange={handleInput} name="state">{states.map(state=>{
          return <option value={state}>{state}</option>
        })}</select> || <h2>Failed to Fetch States</h2>}
        <input type="text" onChange={handleInput} name="address" value={newAddress.address}/>
        <input type="number" onChange={handleInput} name="phone" value={newAddress.phone}/>
      </section>
    </main>
  )
}

export default OrderOptions
