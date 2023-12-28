import React from 'react'
import { Link } from 'react-router-dom'
import notFound from "../../images/notFound.png"

const NotFound = () => {
  return (
    <main className='flex flex-col md:flex-row items-center justify-center gap-0 md:gap-8 -mt-6 sm:mt-0'>
      <section>
        <img src={notFound} alt="" className='md:w-[500px]'/>
      </section>

      <section className='text-center -mt-5 md:mt-0'>
        <h2 className='text-4xl sm:text-5xl my-2 text-slate-700 font-bold' style={{fontFamily:"Arial"}}>Error 404</h2>
        <h4 className='my-3 text-base sm:text-xl font-bold text-slate-500' style={{fontFamily:"Arial"}}>Page not found</h4>
        <Link to={"/"}><button className='px-5 py-2 rounded-[4px] bg-blue-700 text-white text-sm sm:text-base tracking-wide font-medium'>Back Home</button></Link>
      </section>
    </main>
  )
}

export default NotFound
