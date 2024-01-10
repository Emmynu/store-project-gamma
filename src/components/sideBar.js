import { Outlet,NavLink } from 'react-router-dom'
import { auth } from '../firebase-config'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { signOut } from 'firebase/auth'
import { toast } from 'sonner'

const CustomerSideBar = () => {

  function logOut() {
    signOut(auth)
    window.location = "/"
    localStorage.removeItem("id")
    toast.success("Sucessfully signed Out")
  }

  return (   
    <aside  className='hidden border lg:block bg-white shadow-lg shadow-slate-200' data-aos={"fade-right"} data-aos-duration={"600"}>
    
      <header className='flex justify-center flex-col items-center p-5 '>
       {auth?.currentUser ? <img src={ auth?.currentUser?.photoURL} className='w-[70px] h-[70px] md:w-[150px] md:h-[150px] rounded-[50%]'/>:  <section><Skeleton height={150} width={150} borderRadius={100}/></section>}
       {auth?.currentUser ? <h2 className='font-bold text-2xl mt-3 font-["arial"]'>{auth?.currentUser?.displayName}</h2> : <section className='my-2'><Skeleton width={150} height={20}  highlightColor="#f6f6f6 " duration={1}/></section>}

      </header>
      <hr className='-mt-1.5 mb-2'/>
      <section className='flex flex-col px-0 mt-1'>
        <NavLink to={"/profile"}><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>My Account</h4></NavLink>
        <NavLink to={"/orders"}><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Orders</h4></NavLink>
        <NavLink to={"/chats"}><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Inbox</h4></NavLink>
        <NavLink  to={"/collections"}><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Saved Items</h4></NavLink> 
        <NavLink><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Followed sellers</h4></NavLink>
      </section>
      <hr className='mt-1.5'/>
      <section className='flex justify-center items-center p-3'>
        <button className='px-3 text-red-700 hover:bg-red-100 py-1 rounded-[4px] font-medium tracking-normal'>Disable account</button>
        <button className='px-3 text-blue-700 hover:bg-blue-100 py-1 rounded-[4px] font-medium tracking-normal ' onClick={logOut}>LOG OUT</button>
      </section>
      <Outlet />
     
    </aside>
  )
}

export default CustomerSideBar
