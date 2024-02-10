import { toast, Toaster } from "sonner"
import { Outlet, Link } from "react-router-dom"
import orders from "../../images/orders-2.png"
import refund from "../../images/refund-2.png"
import allProduct from "../../images/all-products.png"
// import addProduct from "../../images/add-product.png"
import { useState } from "react"

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false)

  const openSideBar ={
    tranform: "translateX(0%)",
    transition: "all .8s linear",
  }
  const closeSideBar ={
      transition: "all .8s linear",
      transform: "translate(-200%)"
  }


  return (
    
    <main className="">
      <aside className="fixed top-0 left-0 bottom-0 bg-white z-20 border right-[10%] md:right-1/4 lg:right-[70%]" style={showSideBar ? openSideBar : closeSideBar}>
          <header className="side-bar-container p-3">
              <section>
              <Link to={"/"}>
                <div className="logo-section-container">
                <img  src="https://img.icons8.com/hatch/64/ff00ff/bear.png" alt="bear" className="w-[32px] h-[32px] md:w-[39px] md:h-[39px]"/>
                  <h2 className="logo">BearCart</h2>
                </div>
              </Link>
              </section>
              <section onClick={()=>setShowSideBar(!showSideBar)}>
                <div className="sm-bar sm-bar-1"></div>
                <div className="sm-bar sm-bar-2"></div>
              </section>
            </header>
            <article className="pl-5  mt-4" onClick={()=>setShowSideBar(!showSideBar)}>
  
            <Link to={"/admin"}> <h2 className="my-4 font-normal flex items-center text-slate-600 tracking-wide logo text-base">
              <img src={orders} alt="stat" className="mr-2 w-6"/>
                <span>Orders</span>
              </h2></Link>
  

              <Link to={`/dashboard/new-product`}><h2 className="my-4 font-normal flex items-center text-slate-600 tracking-wide logo text-base">
                <img src={refund} alt="stat" className="mr-2 w-6"/>
                <span>Refunds</span>
              </h2></Link>


            <Link to="/dashboard/products">
              <h2 className="my-4 font-normal flex items-center  text-slate-600 tracking-wide logo text-base">
                <img src={allProduct} alt="stat" className="mr-2 w-6"/>
                  <span>All Products</span>
                </h2>
            </Link>
  
            
  
            </article>
      </aside>
      <nav className="fixed top-0 z-10 left-0 right-0 bg-white shadow-md shadow-slate-100 border-b py-7 px-3 md:p-7 flex justify-between  sm:justify-around items-center">
        {/* nav-bar */}
        <section onClick={()=>setShowSideBar(!showSideBar)}>
          <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[20px] my-[3px]"></div>
          <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[30px] my-[3px]"></div>
          <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[20px] my-[3px]"></div>
          <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[30px] my-[3px]"></div>
        </section>
  
        <section>
          <h2 className="text-[20px] sm:text-[28px] leading-3 text-slate-700 font-medium font-[arial] tracking-wide">Admin Dashboard</h2>
        </section>
        <section className="bg-blue-700 text-xs md:text-base shadow-lg font-medium tracking-wider px-7 py-1 rounded-[4px] text-white">
          Emmanuel
        </section>
      </nav>
    <Toaster richColors position="top-right" closeButton/> 
    <Outlet />
     </main>
  )
}

export default Header
