// import { createSeller } from "../../actions/sellers/pricing"
import "./pricing.css"
import { push, ref } from "firebase/database"
import { id } from "../../actions/auth/auth"
import { db, auth } from "../../firebase-config"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { getSellers } from "../../actions/sellers/sellers"
import { usePaystackPayment } from "react-paystack"

const Pricing = () => {
  const [ sellers, setSellers] = useState([])
  const [ isVendor, setIsVendor] = useState(null)

  const config = {
    reference : `${new Date().getFullYear()}${new Date().getTime().toString()}`,
    email: auth?.currentUser?.email,
    amount: 2000000,
    publicKey: 'pk_test_c2484e2d160a0c13c7b439e82b1e07f0334fb022',
  }

  const initializePayment = usePaystackPayment(config)
  
  useEffect(()=>{
    getSellers(setSellers)
  },[])

  useEffect(()=>{
    sellers.find(seller => seller[0] === id) ? setIsVendor(true) : setIsVendor(false)
  })


  function basicPlan() {
    if (isVendor) {
      toast.error("Already a vendor")
    }
    else{
     
      push(ref(db, `vendors/${id}`), {
        pricingPlan:"basic"
      }).then( toast.success("Successfully registered as a vendor"))
    }
  }
  
  function onSucess() {
    console.log("success");
  }
  function onClose() {
    console.log("close");
  }
  return (
    <main className="pricing-container">
      <header >
        <h2>Become A Seller On BearCart</h2>
        <p>How often do you want to pay? </p>
      </header>
      <section className="pricing-card-container">

        <div className="pricing-card">
          <h3>Basic Plan</h3>
          <h4>₦0 <p>Per year</p></h4>
          <p>Ideal for individuals or small businesses getting started. Access essential features to establish your online presence</p>
          <button onClick={basicPlan}>Join for Free</button>
        </div>

        <div className="pricing-card">
          <h3>Premium Plan</h3>
          <h4>₦2,000 <p>Per Year</p></h4>
          <p> Unlock advanced tools and features to elevate your business. Perfect for growing enterprises seeking more capabilities</p>
          <button onClick={()=>initializePayment(onSucess, onClose)}>Join Premium Plan</button> 
        </div>

        <div className="pricing-card">
          <h3>Ultimate Plan</h3>
          <h4>₦10,000 <p>Per year</p></h4>
          <p>Comprehensive solutions  for established businesses. Enjoy exclusive features, priority, support and enhanced Performance</p>
          <button>Join Ultimate Plan</button>
        </div>

      </section>
    </main>
  )
}

export default Pricing
