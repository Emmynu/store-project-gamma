import { useEffect, useState } from 'react'
import { getCurrentUser } from '../actions/auth/auth'
import { Outlet,NavLink } from 'react-router-dom'

const CustomerSideBar = ({state}) => {
  const [user, setUser] = useState([])
  

  useEffect(()=>{
    getCurrentUser(setUser)
  },[])


  return (   
    <aside  className='hidden border lg:block bg-white shadow-lg shadow-slate-200'>
    
      <header className='flex justify-center flex-col items-center p-5 '>
        <img src={user?.url} className='w-[70px] h-[70px] md:w-[150px] md:h-[150px] rounded-[50%]'/>
        <h2 className='font-bold text-2xl mt-3 font-["arial"]'>{user?.name}</h2>
      </header>
      <hr className='-mt-1.5 mb-2'/>
      <section className='flex flex-col px-0 mt-1'>
        <NavLink to={"/profile"}><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>My Account</h4></NavLink>
        <NavLink><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Orders</h4></NavLink>
        <NavLink><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Inbox</h4></NavLink>
        <NavLink  to={"/collections"}><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Saved Items</h4></NavLink> 
        <NavLink><h4 className='py-1.5 hover:bg-blue-100  transition-all px-4  tracking-wider'>Followed sellers</h4></NavLink>
      </section>
      <hr className='mt-1.5'/>
      <section className='flex justify-center items-center p-3'>
        <button className='px-3 text-red-700 hover:bg-red-100 py-1 rounded-[4px] font-medium tracking-normal'>Disable account</button>
        <button className='px-3 text-blue-700 hover:bg-blue-100 py-1 rounded-[4px] font-medium tracking-normal '>LOG OUT</button>
      </section>
      <Outlet />
    
    </aside>
  )
}

export default CustomerSideBar
