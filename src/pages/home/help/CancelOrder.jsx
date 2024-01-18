import { Link } from "react-router-dom"
import order from "../../../images/help/order.jpeg"
import cancel from "../../../images/help/cancel.jpeg"

const CancelOrder = () => {
  return (
    <main>
      <header  className="bg-blue-100 p-5 w-full px-5">
        <span className="text-sm tracking-wider text-slate-600 ml-1 "><Link to={"/"}>Home &gt; </Link></span >
        <span className="text-sm tracking-wider text-slate-600 ml-1"><Link to={-1}>Help &gt; </Link></span >
        <span className="text-sm tracking-wider text-slate-600 ml-1 ">Cancel-order </span>
    </header>
    <section className="max-w-[70rem] mx-5 lg:mx-12 py-7 lg:py-16">
      <header className="h2 font-[arial] text-[25px] tracking-normal">How to cancel an order</header>
      <main>
        <article className="my-10">
        <header>
          <div className="flex items-center">
            <h2 className="font-medium md:text-lg">Step 1:</h2>
            <h3 className="ml-2 font-medium tracking-wide">Naviagate to the Orders Page </h3>
          </div>
          <p className="text-sm my-1.5 text-slate-600">Log into your account and then navigate your way to the orders page</p>
        </header>
          <main className="flex flex-col md:flex-row mt-6">
            <div className="border ">
              <img className="w-full rounded-md h-[300px] object-cover" src={order}/>
            </div>
          </main>
        </article>

        <article className="my-10">
        <header>
          <div className="flex items-center">
            <h2 className="font-medium md:text-lg ">Step 2:</h2>
            <h3 className="ml-3 md:ml-2 font-medium tracking-wide">Request a Refund and cancel the order</h3>
          </div>
          <p className="text-sm my-1.5 text-slate-600">Click on the "cancel" button to request a refund  or  cancel a pending order and after that you'll be contacted for refund</p>
        </header>
          <main className="flex flex-col md:flex-row mt-6">
            <div className="border ">
              <img className="w-full rounded-md h-[300px] object-cover" src={cancel}/>
            </div>
          </main>
        </article>
      </main>
    </section>
    </main>
  )
}

export default CancelOrder
