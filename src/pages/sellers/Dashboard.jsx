import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleSeller, getSellers } from "../../actions/sellers/sellers"
import { auth } from "../../firebase-config"
import stats from "../../images/stats.png"
import allProduct from "../../images/all-products.png"
import addProduct from "../../images/add-product.png"
import chat from "../../images/chat-2.png"
import { id } from "../../actions/auth/auth"
import { Toaster } from "sonner"




const Dashboard = () => {
  const [showSideBar, setShowSideBar] = useState(false)
  const [isVendor, setIsVendor] = useState(false)
  const [vendor, setVendor] = useState([])
  const [vendors, setVendors] = useState([])

  
  useEffect(()=>{
    getSingleSeller(id, setVendor)
    getSellers(setVendors)
  },[])



  useEffect(()=>{
    vendors.find(seller => {
      if(seller[0] === auth?.currentUser?.uid){
        setIsVendor(true)
      }
      else{
        setIsVendor(false)
      }
    })
  },[vendors])

  

  const openSideBar ={
    tranform: "translateX(0%)",
    transition: "all .8s linear",
  }
  const closeSideBar ={
      transition: "all .8s linear",
      transform: "translate(-200%)"
  }




  return (
   <>{ 
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

          <Link to={"/dashboard"}> <h2 className="my-4 font-normal flex items-center text-slate-600 tracking-wide logo text-base">
            <img src={stats} alt="stat" className="mr-2 w-6"/>
             <span>Stats</span>
           </h2></Link>

           <Link to={"/chats"}> <h2 className="my-4 font-normal flex items-center text-slate-600 tracking-wide logo text-base">
              <img src={chat} alt="stat" className="mr-2 w-6"/>
                <span>Chats</span>
            </h2></Link>


          <Link to="/dashboard/products">
           <h2 className="my-4 font-normal flex items-center  text-slate-600 tracking-wide logo text-base">
             <img src={allProduct} alt="stat" className="mr-2 w-6"/>
               <span>All Products</span>
             </h2>
          </Link>

           <Link to={`/dashboard/new-product`}><h2 className="my-4 font-normal flex items-center text-slate-600 tracking-wide logo text-base">
             <img src={addProduct} alt="stat" className="mr-2 w-6"/>
             <span>Add Product</span>
           </h2></Link>

         </article>
   </aside>
   <nav className="fixed top-0 z-10 left-0 right-0 bg-white shadow-md shadow-slate-100 border-b p-7 flex justify-between  sm:justify-around items-center">
     {/* nav-bar */}
     <section onClick={()=>setShowSideBar(!showSideBar)}>
       <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[20px] my-[3px]"></div>
       <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[30px] my-[3px]"></div>
       <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[20px] my-[3px]"></div>
       <div className="bg-blue-700 cursor-pointer h-[4px] rounded-full w-[30px] my-[3px]"></div>
     </section>

     <section>
       <h2 className="text-2xl sm:text-[28px] leading-3 text-slate-700 font-medium font-[arial] tracking-wide">Dashboard</h2>
     </section>
     <section className="bg-blue-700 shadow-lg font-medium tracking-wider px-7 py-1 rounded-[4px] text-white">
      {vendor.map(seller=>{
        return <h2>{seller[1]?.pricingPlan}</h2>
      })}
     </section>
   </nav>
   <Toaster richColors position="top-right" closeButton/> 
   <Outlet />
    </main>
    // <section  className="flex flex-col  items-center text-center mt-24 ">
    //   <img src={sell} alt="sell" className="w-[300px]" />
    //   <h4 className="my-3.5 sm:my-2  text-sm tracking-wider md:text-sm px-3">Unfortunately! This page is for sellers only. click the button below to become a vendor</h4>
    //  <Link to={"/pricing"}> <button className="bg-blue-700 px-5 py-1.5 rounded-[4px] text-white tracking-wider text-sm my-1.5">Become a seller</button></Link>
    // </section>
 }
  </>
  )
}

export default Dashboard
