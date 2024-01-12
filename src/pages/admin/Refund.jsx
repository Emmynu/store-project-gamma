import { useEffect, useState } from "react"
import { getRefunds } from "../../actions/products/orders"
import { toast, Toaster } from "sonner"


const Refund = () => {
  const [refunds, setRefunds] = useState([])
  const [filteredRefunds, setFilteredRefunds] = useState([])
  const [orderRef, setOrderRef] = useState([])

  useEffect(()=>{
    getRefunds(setRefunds)
  },[])
  console.log(refunds)

    function getRefundOrder(e) {
      e.preventDefault()
      if(orderRef.length > 0){
        const newRefund = refunds.filter(refund=> refund[0] === orderRef.trim())
        console.log(newRefund);
        setFilteredRefunds(newRefund)
        setOrderRef("")
      }
      else{
        toast.error("Invalid Reference ID")
      }
    }

    // console.log(filteredRefunds);
  return (
    <main className="form-container">
     <section>
      <header className="form-header">
        <div>
          <img width="64" height="64" src="https://img.icons8.com/hatch/64/ff00ff/bear.png" alt="bear"/>
        </div>

        <div>
          <h2>Find Order Refunds</h2>
          <h3 className="text-sm tracking-wide">Enter the <strong> Order ID </strong> and we'll take it from there!</h3>
        </div>
      </header>
      <form onSubmit={getRefundOrder} className="form-content">
          <input type="text"  value={orderRef} onChange={(e)=>setOrderRef(e.target.value)} placeholder="Order ID"/>
          <button className="form-btn">Search</button>
        </form>
     </section>
      {filteredRefunds.length > 0 ? filteredRefunds.map(refund=>{
        return <article>
         {/* { console.log(refund)} */}
          <h2>{refund[1]?.refundType}</h2>
        </article>
      }): ""}
      <Toaster position="top-right" richColors closeButton/>
    </main>
  )
}

export default Refund
