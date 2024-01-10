import { Outlet,Link } from "react-router-dom"
import "./home.css"
import { useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase-config"
import searchIcon from "../../images/search.png"
import userIcon from "../../images/user.png"
import loveIcon from "../../images/love.png"
import orderIcon from "../../images/order.png"
import load from "../../images/load.png"
import chatIcon from "../../images/chat.png"
import empty from "../../images/not-found.gif"
import { Toaster, toast } from "sonner"
import { getCart, removeItemFromCart } from "../../actions/products/cart"


const Navigation = () => {
  const [toggle, setToggle] = useState({isNavFixed:false, isCartOpen:false, isSideBarOpen:false, isAccountOpen:false, isHelpOpen:false,others:false, isSearchInputOpen:false})
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setvalue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const date = new Date().getFullYear()

  const openSideBar ={
      tranform: "translateX(0%)",
      transition: "all .8s linear",
  }
  const closeSideBar ={
      transition: "all .8s linear",
      transform: "translate(-200%)"
  }
  
  const down  = {
    transition: "all .5s linear",
    transform: "rotate(-180deg)"
  }
  const up  = {
    transition: "all .5s linear",
    transform: "rotate(0deg)"
  }
 
  useEffect(()=>{
    getCart(setCart)
  },[])

  useEffect(()=>{
  cart.reduce((totalPrice, price)=>{
    totalPrice += price[1]?.price * (price[1]?.quantity)
    setTotal(totalPrice + 600)
    return totalPrice
  },0)
  },[cart])
  

  window.addEventListener("scroll", function(){
   const scrollHeight = this.pageYOffset
    scrollHeight >=50 ?
    setToggle(prev => {return{...prev, isNavFixed:true}}): setToggle(prev => {return{...prev, isNavFixed:false}})
  })

  function toggleCart() {
    setToggle(prev=>{return{...prev, isCartOpen:!toggle.isCartOpen , isSideBarOpen:false}});
  }

  function toggleHelpNav() {
    setToggle(prev=>{return {...prev, isHelpOpen:!toggle.isHelpOpen, isAccountOpen:false}})
  }

  function toggleAccountNav() {
    setToggle(prev=>{return{...prev,isAccountOpen:!toggle.isAccountOpen, isHelpOpen:false}})
  }

  function toggleSideBar() {
    setToggle(prev=>{return{...prev,isSideBarOpen:!toggle.isSideBarOpen, isCartOpen:false}})
  }
 async function signOutUser(){
    await signOut(auth) 
    toggleAccountNav()
    window.location = "/"
    localStorage.removeItem("id")
    toast.success("Sucessfully signed Out")
  }

  function searchProduct(e) {
    e.preventDefault()
    if(value.length > 0){
      setIsLoading(true)
      window.location = `/search/?query=${value.trim().toLowerCase()}`
    }
  }

  function removeItem(id){
    removeItemFromCart(id)
  }
  return (
    <main className="z-[50] ">
      <section className={toggle.isNavFixed ? "fixed top-0 bg-white right-0 left-0 shadow-lg shadow-slate-100 flex justify-between items-center lg:block pr-6 pb-1 lg:mr-0 z-[150]" : "flex justify-between items-center lg:block mr-6 mt-3 lg:mt-5 lg:mr-0"} style={{transition:"all .5s ease-in-out"}}>
        <header className="nav-header ">
          {/* logo section */}
          <section>
            <Link to={"/"}>
              <div className="logo-section-container">
              <img  src="https://img.icons8.com/hatch/64/ff00ff/bear.png" alt="bear" className="w-[32px] h-[32px] md:w-[39px] md:h-[39px]"/>
                <h2 className="logo">BearCart</h2>
              </div>
            </Link>
          </section>

          {/* search section */}
          <form className="hidden lg:flex col-span-2 justify-center mt-1" onSubmit={searchProduct}>
            <section className="search-section-container w-[65%]" >
              <img src={searchIcon} alt="search" />
              <input type="text" name="" id="" placeholder="Search products, brands, categories" onChange={(e)=>setvalue(e.target.value)} value={value} className="bg-transparent"/>
              <h2 onClick={()=>setvalue("")} className={value.length > 0 ? "block text-xs text-red-600 cursor-pointer" : "hidden"}>&#10006;</h2>
            </section>
            <button className="search-btn">{isLoading ? <span><img src={load} alt="" className="w-6 animate-spin"/></span>: "Search"}</button>
          </form>

          {/* others */}
          <section className="hidden lg:flex items-center ml-3">
            {/* account */}
            <div className="nav-links-container relative" onClick={toggleAccountNav}>
              <img src={userIcon} alt="account" width="24" height="24"/>
              <h2>Account</h2>
              <img width="24" height="24" src="https://img.icons8.com/external-thin-kawalan-studio/24/external-up-arrow-arrows-thin-kawalan-studio.png" alt="external-up-arrow-arrows-thin-kawalan-studio" style={toggle.isAccountOpen ? up: down}/>
            </div>

            {/* help */}
            <div className="nav-links-container" onClick={toggleHelpNav}>
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/help.png" alt="help" className="help"/>
              <h2>Help</h2>
              <img width="24" height="24" src="https://img.icons8.com/external-thin-kawalan-studio/24/external-up-arrow-arrows-thin-kawalan-studio.png" alt="external-up-arrow-arrows-thin-kawalan-studio" style={toggle.isHelpOpen ? up: down}/>
            </div>

            {/* cart */}
            <div className="nav-links-container" onClick={toggleCart}>
            <img src="https://img.icons8.com/material-outlined/24/shopping-cart--v1.png" alt="shopping-cart--v1"className="cart" />
              <h2>Cart</h2>
            </div>
          </section>

             
        </header>
        {/* sm search bar */}
        {toggle.isSearchInputOpen && <form onSubmit={searchProduct} className="border  px-3 py-0.5 rounded-[4px] border-slate-700 flex items-center  lg:hidden"> 
          <input type="text" onChange={(e)=> setvalue(e.target.value)} value={value} placeholder="Search" className=" text-sm tracking-wider text-slate-600 outline-none w-full "/> 
          <span className="text-red-600 text-base font-semibold cursor-pointer ml-3" onClick={()=>setToggle(prev => {return {...prev, isSearchInputOpen:false}})}>
            <div className="sm-bar sm-bar-1 w-[15px]"></div>
            <div className="sm-bar sm-bar-2 w-[15px]"></div>
          </span>
        </form>  }
        {/* sm-icons */}
        {/* hamburger-icon */}
       {!toggle.isSearchInputOpen && <section className="flex items-center lg:hidden mr-4">
        <img src={searchIcon} alt="search-icon"className="cursor-pointer w-[24px]" onClick={()=>setToggle(prev => {return{...prev, isSearchInputOpen:!toggle.isSearchInputOpen}})} />
        <img src="https://img.icons8.com/material-outlined/24/shopping-cart--v1.png" alt="shopping-cart--v1"className="cursor-pointer" onClick={toggleCart} />

          <div className="nav-icon ml-1 cursor-pointer"onClick={toggleSideBar} >
            <div></div>
            <div></div>
            <div></div>
          </div>
         
        </section> }
      </section>

        {/* other navs */}

      {/* cart */}
      <section className="cart-container overflow-y-scroll" style={toggle.isCartOpen ? openSideBar : closeSideBar} onClick={toggleSideBar}>
        <nav className="flex justify-between p-2 border-b mb-4">
          <h2 className="text-[17px] font-medium text-slate-700 tracking-wide">Cart ({cart.length})</h2>
          <button className="text-base font-medium text-red-700 t tracking-widest" onClick={toggleCart}>&#10006;</button>
        </nav>
          {cart.length > 0 ? <section  className="mx-3">
            {cart.slice(0,5).map(item=>{
              return <section className="flex  gap-3  mb-6">
                <div>
                  <img src={item[1]?.url} alt="" className="object-cover w-[50px] h-[50px] md:w-[100px] md:h-[70px]" />
                </div>
                <div>
                  <h2 className="text-sm md:text-base  text-slate-600 tracking-wider">{item[1]?.name}</h2>
                  <h3 className="text-blue-700 text-xs md:text-sm tracking-wider">{item[1]?.price}</h3>
                  <button className="text-sm -mt-1 text-slate-600" onClick={()=>removeItem(item[0])}>remove</button>
                </div>
              </section>
            })}
            {cart.length >= 5  && <h2 className="text-right text-sm tracking-wider text-blue-600 mb-3">View All</h2>}
            <hr/>
            <footer>
              <div className="flex justify-between  text-sm tracking-wide text-slate-600 my-1.5">
                <h2>Shipping</h2>
                <h4>₦500</h4>
              </div> 
               <div className="flex justify-between  text-sm tracking-wide text-slate-600 my-1.5">
                <h2>Transaction Fee</h2>
                <h4>₦100</h4>
              </div>  
              <div className="flex justify-between  text-sm tracking-wide text-slate-600 my-1.5">
                <h2>Total</h2>
                <h4>₦{total}</h4>
              </div>
              <button className="px-3 py-2 bg-blue-700 rounded-[4px] text-white mt-3 w-full text-sm tracking-wide font-medium "><Link to={"/checkout"}>Continue to Checkout</Link></button>
            </footer>
          </section> :
          <section className="text-center flex mt-12 justify-center flex-col items-center">
            <img src={empty} alt="" className="w-[250px]"/>
            <h2  className="font-medium text-slate-800 -mt-2 mb-1.4 text-center">Sorry! Your Cart is empty</h2>
            <p className="text-sm tracking-wide text-slate-600 my-1.5 px-5">Found a product you're interested in? Click on the addToCart button next to the item to add it to your cart!</p>
            <Link to="/"><button className="bg-blue-700 px-5 py-1.5 rounded-[4px] text-white tracking-wider text-sm my-1.5">Continue Shopping</button></Link>
            </section>}
        </section>

        {/* account */}
        {toggle.isAccountOpen && <section className="account-container" >
          <Link to={"/profile"}>
          <div className="pt-3">
          <img src={userIcon} alt="account" width="24" height="24"/>
            <h2>My Account</h2>
          </div>
          </Link>

          <Link to={"/orders"}>
          <div>
          <img src={orderIcon} className="w-[22px]" alt="package"/>
            <h2>Orders</h2>
          </div>
          </Link>

          <Link to={"/collections"}>
          <div>
            <img src={loveIcon} alt="filled-like"/>
            <h2>Collections</h2>
          </div>
          </Link>
          <hr className="bg-slate-500 my-1 h-[2px]"/>
          <button>{auth?.currentUser === null || auth.currentUser === undefined ? <Link to="/login">SIGN IN</Link>: <h2 onClick={signOutUser}>LOG OUT</h2>}</button>
        </section>}

        {/* help */}
        {toggle.isHelpOpen && <section className="account-container pt-2 right-[5%]">
          <Link>
            <div>Place an order</div>
          </Link>
          <Link>
            <div>Payment options</div>
          </Link>
          <Link>
            <div>Cancel an order</div>
          </Link>
          <Link>
            <div>Refund & Returns</div>
          </Link>

          <hr className="bg-slate-500 my-1 h-[2px]"/>
          <button className="flex justify-center items-center" > <img src={chatIcon} alt="chat" className="w-5 mr-2"/>Live Chat</button>
          </section>}

          {/* side bar */}
          <section className="cart-container z-[250] side-bar" style={toggle.isSideBarOpen ? openSideBar : closeSideBar}>
            <header className="side-bar-container">
              <section>
              <Link to={"/"}>
                <div className="logo-section-container">
                <img  src="https://img.icons8.com/hatch/64/ff00ff/bear.png" alt="bear" className="w-[32px] h-[32px] md:w-[39px] md:h-[39px]"/>
                  <h2 className="logo">BearCart</h2>
                </div>
              </Link>
              </section>
              <section onClick={toggleSideBar}>
                <div className="sm-bar sm-bar-1"></div>
                <div className="sm-bar sm-bar-2"></div>
              </section>
            </header>

            <section className="side-nav-links-container" >
              <div onClick={toggleSideBar}>
                <h2><Link to={"/profile"}>My Account</Link></h2>
                <h2><Link to={"/orders"}>Orders</Link></h2>
                <h2><Link to={"/chats"}>Inbox</Link></h2>
                <h2><Link to={"/collections"}>Collections</Link></h2>
              </div>
              <h2 className="flex justify-between items-center" onClick={()=>setToggle(prev => {return{...prev,others:!toggle.others}})}><span><Link>Help Center</Link></span><span><img width="24" height="24" src="https://img.icons8.com/external-thin-kawalan-studio/24/external-up-arrow-arrows-thin-kawalan-studio.png" alt="external-up-arrow-arrows-thin-kawalan-studio" style={toggle.others ? up: down} className="cursor-pointer"/></span></h2>

              <div className={toggle.others ? "block mt-3 text-[15px] ml-2" : "hidden"} onClick={toggleSideBar}> 
                <h2><Link> Place an order</Link></h2>
                <h2><Link> Payment options</Link></h2>
                <h2><Link>Cancel an order</Link></h2>
                <h2><Link> Refund & Returns</Link></h2>
              </div>

              <button className="bg-blue-700 px-5 w-11/12 md:w-1/2 py-2 mt-2.5 cursor-pointer font-medium rounded-[4px]">{auth?.currentUser === null || auth.currentUser === undefined ? <span className="text-white"><Link to="/login">SIGN IN</Link></span>: <h3 onClick={signOutUser} className="text-white">LOG OUT</h3>}</button>
            </section>
          </section>
        <Toaster richColors position="top-right"/>
      <Outlet context={{auth: auth?.currentUser}}/>
      <hr className="mt-5"/>
      <footer className=" py-3 mx-4 md:mx-7 text-center  items-center text-sm text-slate-600 tracking-wider">
        <h2 className="text-xl text-slate-800 font-bold flex justify-center items-center"><img src="https://img.icons8.com/hatch/64/ff00ff/bear.png" className="w-[26px]" alt="" />BearCart</h2>
        <h2>&copy; {date} All Rights Reserved</h2>
      </footer>
    </main>
  )
}

export default Navigation