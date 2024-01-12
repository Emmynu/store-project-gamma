import { Link } from "react-router-dom"
import "./help.css"

const Payment = () => {
  return (
    <main>
      <header className="bg-blue-100 p-5 w-full px-5">
      <span className="text-sm tracking-wider text-slate-600 ml-1 "><Link to={"/"}>Home &gt; </Link></span >
      <span className="text-sm tracking-wider text-slate-600 ml-1"><Link to={-1}>Help &gt; </Link></span >
      <span className="text-sm tracking-wider text-slate-600 ml-1 ">Payment </span>
      </header>
      <section className="max-w-[70rem] mx-3 lg:mx-12 py-7 lg:py-16">
        <div>
        <h3 className={"h2"}>Payment</h3>
        <article>
          
          <h4 className="font-medium tracking-wide my-3 text-slate-700 text-[20px] lg:text-[25px] ">Payment methods</h4>
          <p className="lg:font-medium text-sm lg:text-[17px] leading-loose tracking-wider lg:tracking-normal text-slate-600 my-7"> Choose your preferred payment method for a hassle-free checkout experience. We offer the flexibility of both <strong>Payment On Delivery</strong> and <strong>Secure Online Payment</strong>. Select what suits you best, whether its the convenience of paying online or the assurance of paying upo delivery</p>
          {/* <ul>
            <li className="my-1.5 text-slate-600 tracking-wide  font-medium text-sm lg:text-base">Donec commodo felis ut lacus volutpat blandit.</li>
            <li className="my-1.5 text-slate-600 tracking-wide  font-medium text-sm lg:text-base">Donec commodo felis ut lacus volutpat blandit.</li>
            <li className="my-1.5 text-slate-600 tracking-wide  font-medium text-sm lg:text-base">Donec commodo felis ut lacus volutpat blandit.</li>
            <li className="my-1.5 text-slate-600 tracking-wide  font-medium text-sm lg:text-base">Donec commodo felis ut lacus volutpat blandit.</li>
            <li className="my-1.5 text-slate-600 tracking-wide  font-medium ">Donec commodo felis ut lacus volutpat blandit.</li>
          </ul> */}
        </article>
        </div>
        <hr className="my-20"/>
        <div>
          <h3 className="h2 mb-6 text-[26px]">Payment Security</h3>
          <p className="lg:font-medium text-sm lg:text-[17px] leading-loose tracking-wide text-slate-600 my-7">Experience peace of mind with our roboust payment security. Your transactions and details are handled with utmost care through <strong>PayStack</strong> ensuring a secure environment. We proudly accept VISA and MasterCards for seamless and safe transactions </p>
        </div>
        <hr className="my-20"/>
        <div>
          <h2 className="h2 mb-6 text-[26px]">Order Limitations</h2>
          <p className="lg:font-medium text-sm lg:text-[17px] leading-loose tracking-wide text-slate-600 my-7">Shop without boundaries! We believe in limitless possibilites, which is why there are no order limits. Enjoy thr freedom to fill your Cart without constraints.</p>
        </div>
      </section>
    </main>
  )
}

export default Payment
