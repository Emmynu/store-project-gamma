import pickProduct from "../../../images/help/pick-product.jpeg"
import pay from "../../../images/help/pay.jpeg"
import checkout from "../../../images/help/checkout.jpeg"
import addProductCart from "../../../images/help/add-product-cart.jpeg"
import success from "../../../images/help/success.jpeg"
import searchProduct from "../../../images/help/search-product.jpeg"
import { useLocation, Link } from "react-router-dom"

const PlaceOrder = () => { 
  console.log(useLocation());
  return <main> 
    <header  className="bg-blue-100 p-5 w-full px-5">
      <span className="text-sm tracking-wider text-slate-600 ml-1 "><Link to={"/"}>Home &gt; </Link></span >
      <span className="text-sm tracking-wider text-slate-600 ml-1"><Link to={-1}>Help &gt; </Link></span >
      <span className="text-sm tracking-wider text-slate-600 ml-1 ">Place-order </span>
    </header>
    <section className="max-w-[70rem] mx-5 lg:mx-12 py-7 lg:py-16">
      <header className="h2 font-[arial] text-[25px] tracking-normal">How to place an order</header>
      <main>
        {/* steps */}
        <article className=" my-10">
          <header>
            <div className="flex items-center">
              <h2 className="font-medium md:text-lg ">Step 1:</h2>
              <h3 className="ml-2 font-medium tracking-wide">Browse and Choose Product</h3>
            </div>
            <p className="text-sm my-1.5 text-slate-600">Browse <strong><Link to={"/"}>our website</Link></strong> or use the search bar then click on the product to view more information about it</p>
          </header>
          <main className="flex flex-col md:flex-row mt-6">
            <div className="border border-slate-400">
              <img className="w-full rounded-md  object-cover" src={searchProduct}/>
            </div>
            <div className="border ml-0 mt-4 md:mt-0 md:ml-4 border-slate-400">
              <img className="w-full rounded-md object-cover" src={pickProduct}/>
            </div>
          </main>
        </article>

        <article className=" my-10">
          <header>
            <div className="flex items-center">
              <h2 className="font-medium md:text-lg ">Step 2:</h2>
              <h3 className="ml-2 font-medium tracking-wide"> Add your product to your cart.</h3>
            </div>
            <p className="text-sm my-1.5 text-slate-600">Review the product content and  Click on the “Add to Cart” button </p>
          </header>
          <main className="flex flex-col md:flex-row mt-6 gap-5 items-start">
            <div className="border ">
              <img className="w-full rounded-md object-cover" src={addProductCart}/>
            </div>
            <div className="border ">
              <img className="w-full rounded-md object-cover" src={checkout}/>
            </div>
          </main>
        </article>

        <article className=" my-10">
          <header>
            <div className="flex items-center">
              <h2 className="font-medium md:text-lg ">Step 3:</h2>
              <h3 className="ml-2 font-medium tracking-wide"> Complete the checkout.</h3>
            </div>
            <p className="text-sm my-1.5 text-slate-600"> Fill in your delivery address and choose your preferred delivery method.
            and  select a delivery option </p>
          </header>
          <main className="flex flex-col md:flex-row mt-6">
            <div className="border ">
              <img className="w-full rounded-md h-[300px] object-cover" src={pay}/>
            </div>
          </main>
        </article>

        <article className=" my-10">
          <header>
            <div className="flex items-center">
              <h2 className="font-medium md:text-lg ">Step 4:</h2>
              <h3 className="ml-2 font-medium tracking-wide"> Success!.</h3>
            </div>
            <p className="text-sm my-1.5 text-slate-600">Once your order is placed, a unique order number is generated, which can be used to track your order.  </p>
          </header>
          <main className="flex flex-col md:flex-row mt-6">
            <div className="border ">
              <img className="w-full rounded-md h-[300px] object-cover" src={success}/>
            </div>
          </main>
        </article>

      </main>
    </section>
  </main>
}

export default PlaceOrder