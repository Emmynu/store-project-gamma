import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from "aos"
import "aos/dist/aos.css"
import notFound from "../../images/sell.gif"

const NotFound = () => {

  useEffect(()=>{
    AOS.init()
  },[])

  return (
    <main className='flex flex-col md:flex-row items-center justify-center gap-8 mt-7 sm:mt-10'>
      <section>
        <img src={notFound} alt="" className='w-[300px] md:w-[400px] ' data-aos={"fade-up"} data-aos-duration={"900"}/>
      </section>

      <section className='text-center -mt-5 md:mt-0'data-aos={"zoom-in"} data-aos-duration={"1100"} >
        <h2 className='text-4xl sm:text-5xl my-2 text-slate-700 font-bold' style={{fontFamily:"Arial"}}>Error 404</h2>
        <h4 className='my-3 text-base sm:text-xl font-bold text-slate-500' style={{fontFamily:"Arial"}}>Page not found</h4>
        <Link to={"/"}><button className='px-5 py-2 rounded-[4px] bg-blue-700 text-white text-sm sm:text-base tracking-wide font-medium'>Back Home</button></Link>
      </section>
    </main>
  )
}

export default NotFound
