// import { createSeller } from "../../actions/sellers/pricing"
import "./pricing.css"
import { push, ref } from "firebase/database"
import { id } from "../../actions/auth/auth"
import { db, auth } from "../../firebase-config"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { createSeller, getSellers } from "../../actions/sellers/sellers"
import { usePaystackPayment } from "react-paystack"

const Pricing = () => {
  const [ sellers, setSellers] = useState([])
  const [ isVendor, setIsVendor] = useState(null)

  const config = {
    reference : `${new Date().getFullYear()}${new Date().getTime().toString()}`,
    email: auth?.currentUser?.email,
    amount: 2000 * 100,
    publicKey: 'pk_test_c2484e2d160a0c13c7b439e82b1e07f0334fb022',
  }

    const initializePayment = usePaystackPayment(config) // TODO: Fix this to display the error using sonner and not crash the application when internet is absent

    
  useEffect(()=>{
    getSellers(setSellers)
  },[])

  useEffect(()=>{
    sellers.find(seller => seller[0] === id) ? setIsVendor(true) : setIsVendor(false)
  })

  function onSuccess() {
     createSeller("Premium")
     .then(toast.success("Sucessfully a vendor"))
     .then(window.location="/dashboard")
  }


  function basicPlan() {
    if (isVendor) {
      toast.error("Already a vendor")
      setTimeout(() => {
        window.location= "/dashboard"
      }, 1500);
    }
    else{
      createSeller("Basic").then(toast.success("Sucessfully a vendor")).then(window.location= "/dashboard")
    }
  }

  async function premiumPlan() {
    if(isVendor){
      toast.error("Already a vendor")
      setTimeout(() => {
        window.location= "/dashboard"
      }, 1500);
    }
    else{
      try {
        initializePayment({onSuccess})
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

 
  return (
    <main className="pricing-container">
      <header className="text-center">
        <h2>Become A Seller On BearCart</h2>
        <p>How often do you want to pay? </p>
      </header>

      <section className="pricing-card-container px-1.5">

        <div className="pricing-card">
          <header className="border-b border-slate-300">
            <h3>Basic Plan</h3>
            <p>Ideal for individuals or small businesses getting started. Access essential features to establish your online presence</p>
          </header>
          <section className="my-4 text-left ml-4 ">
            <h4><span>₦0</span> <sub className="text-sm mt-1 ml-1.5 tracking-wider text-slate-600">/one-time/org</sub></h4>
          </section>

          <section className="border-t mt-6 border-slate-300 pt-6  ">
            <h5 className=" tracking-wider text-slate-600 text-sm">Get Started with:</h5>
          <article className="mt-3">
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Limited to 20 product uploads</span>
              </h5>
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Basic analytics and reporting tools</span>
              </h5>
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>No Priority customer support</span>
              </h5>
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Essential features for startups and small businesses</span>
              </h5>
          </article>
          </section>

          <button onClick={basicPlan}>Join for Free</button>
        </div>

        <div className="pricing-card">
          <header  className="border-b border-slate-300">
              <h3>Premium Plan</h3>
              <p> Unlock advanced tools and features to elevate your business. Perfect for growing enterprises seeking more capabilities</p>
          </header>
          
          <section className="my-4 text-left ml-4 ">
            <h4><span>₦2,000 </span> <sub className="text-sm mt-1 ml-1.5 tracking-wider text-slate-600">/one-time/org</sub></h4>
          </section>       

          <section className="border-t mt-6 border-slate-300 pt-6  ">
            <h5 className=" tracking-wider text-slate-600 text-sm">Get Started with:</h5>
           <article className="mt-3">
              <h5  className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Limited to 50 product uploads</span>
              </h5>
              <h5  className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Advanced analytics and reporting tools</span>
              </h5>
              <h5  className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span> Priority customer support</span>
              </h5>
              <h5  className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Enhanced features for growing businesses</span>
                {/* Comprehensive features for large enterprises */}
              </h5>
           </article>
          </section>
          <button onClick={premiumPlan}>Join Premium Plan</button> 
        </div>

        <div className="pricing-card">

          <header className="border-b border-slate-300">
              <h3>Ultimate Plan</h3>
              <p>Comprehensive solutions  for established businesses. Enjoy exclusive features, priority, support and enhanced Performance</p>
          </header>

          <section className="my-4 text-left ml-4 ">
            <h4><span>₦10,000</span> <sub className="text-sm mt-1 ml-1.5 tracking-wider text-slate-600">/one-time/org</sub></h4>
          </section>
         

          <section className="border-t mt-6 border-slate-300 pt-6  ">
            <h5 className=" tracking-wider text-slate-600 text-sm">Get Started with:</h5>
           <article className="mt-3">
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Unlimited product uploads</span>
              </h5>
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Robust analytics, reporting and customization options</span>
              </h5>
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Dedicated account manager and premium customer support</span>
              </h5>
              <h5 className="mt-2 text-slate-600 text-sm tracking-wide">
                <span className="text-blue-700 mr-1.5">✓</span>
                <span>Comprehensive features for large enterprises</span>
              </h5>
           </article>
          </section>
          <button>Contact Us</button>
        </div>

      </section>
    </main>
  )
}

export default Pricing
