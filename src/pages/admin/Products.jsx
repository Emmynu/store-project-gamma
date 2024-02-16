import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import Moment from "react-moment"
import { deleteProduct, getProducts } from "../../actions/products/products"
import clock from "../../images/clock.png"
import allProduct from "../../images/all-products.png"
import empty from "../../images/notFound.png"
import { LoadVendorProducts } from "../../components/Loading"

export const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: null, // Hide default previous button
  nextArrow: null, // Hide default next button
  autoplay:true,
  autoplaySpeed:3000
};

const AdminProduct = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getProducts(setIsLoading, setProducts)
  },[])



  if (isLoading) {
    return <h2 className="mt-24"><LoadVendorProducts /></h2>
  }


  return (
    <main className="mt-32">
      <header>
        <h3  className="text-2xl text-center  sm:text-[25px] leading-3 text-slate-700 font-medium font-[arial] tracking-wide">All Products</h3>
      </header>
      <div className="mt-7 overflow-x-hidden" >
      {products.length > 0 ? 
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 md:mx-7 lg:mx-12 mt-4">
          {products.reverse().map(product=>{
            return <article className="bg-white shadow-lg hover:shadow-3xl rounded-md transition-[3s] cursor-pointer  border">
              <section>
                <Slider {...settings}>
                  {product[1]?.productImages.map(url => {
                    return <img src={url} alt="" className="w-full h-[200px] object-cover" />
                  })}
                </Slider>
              </section>
              <section className="p-3 pb-1.5 mt-2 flex items-center justify-between">
                <article>
                  <h2 className="text-slate-700 font-medium my-1 sm:text-lg">{product[1]?.name}</h2>
                  <h4 className="text-sm text-blue-700 tracking-wider my-1">₦{product[1]?.price}</h4>
                 <div className="flex items-center my-1.5">
                  <img src={clock} alt="clock" className="w-4 mr-1"/> 
                    <Moment fromNow className="text-sm  text-slate-600 tracking-wider ">
                      {product[1]?.createdAt}
                    </Moment>
                 </div>
                </article>
                <article>
                  <h4 className="bg-blue-100 shadow-md px-2 py-1.5 tracking-wider  text-blue-700 text-xs">{product[1]?.category}</h4>
                  
                  <h4 className="mt-3 text-[13px] tracking-wider text-slate-600 flex items-center">
                    <img src={allProduct} alt="products" className="w-4 mr-1"/>
                    <span>{product[1]?.quantity}</span></h4>
                </article>
              </section>
              <footer>
                
              <button className="ml-3 shadow px-4 py-1 text-blue-700 bg-blue-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide">Disable</button>

                <button onClick={()=>deleteProduct(product[0])} className="ml-3 shadow px-4 py-1 text-red-800 bg-red-100 rounded-[4px] font-medium mb-4 mt-1 tracking-wide">Delete</button>
              </footer>
            </article>
          })}
        </section>
      : <section className="mt-6 flex flex-col items-center justify-center">
          <img src={empty} alt="empty" />
          <h3 className="text-slate-700 text-center tracking-wide font-medium -mt-6">Unfortunately, No Product Found</h3>
          <button className="px-4 py-1.5 rounded-[4px] bg-blue-700 font-normal my-4 text-sm text-white tracking-wider "><Link to={"/dashboard/new-product"}>Upload Now</Link></button>
        </section>}
    </div>
    </main>
  )
}

export default AdminProduct
