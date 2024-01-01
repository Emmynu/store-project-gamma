import { useEffect, useRef, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { getSingleProduct } from '../../actions/products/products'
import clock from "../../images/clock.png"
import brandIcon from "../../images/brand.png"
import cartIcon from "../../images/cart.png"
import loveIcon from "../../images/loveTwo.png"
import chatIcon from "../../images/chat.png"
import "./products.css"
import Moment from "react-moment"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getCollection, removeProductFromCollection, saveCollectionDb } from '../../actions/products/collections'
import { serverTimestamp } from 'firebase/database'
import { id as userId } from '../../actions/auth/auth'
import { Toaster,toast } from 'sonner'
import { addProductToCart, getCart } from '../../actions/products/cart'
import { getFeedBacks } from '../../actions/products/feedback'

export const slide2 ={
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Detailed = () => {
  const { id, category, brand} = useParams()
  const [product, setProduct] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isProductInCart, setIsProductInCart] = useState(false)
  const [collection, setCollection] = useState([])
  const [feedBacks, setFeedBacks] = useState([])
  const [cart, setCart] = useState([])
  const sliderRef = useRef(null)


  useEffect(()=>{
    getSingleProduct(id, setProduct)
    getCollection(userId, setCollection)
    getFeedBacks(id, setFeedBacks)
    getCart(setCart)
  },[])

  useEffect(()=>{
    if(collection.find(item=>item[1].productId === id)){
      setIsSaved(true)
    }
    else{
      setIsSaved(false)
    }
  })
  useEffect(()=>{
    if(cart.find(item=> item[1].productId === id)){
      setIsProductInCart(true)
    }else{
      setIsProductInCart(false)
    }
  })

  const settings ={
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: product?.productImages.length <= 2 ? 5 : product?.productImages.length,
    slidesToScroll: 1,
  }


  
  function handleSlide(i) {
    sliderRef.current.slickGoTo(i)
  }

  function saveCollection() {
   if (isSaved) {
    collection.map(item => {
      if(item[1]?.productId === id){
        removeProductFromCollection(userId, item[0])
        toast.error("Removed")
      }
    })
   } else {
    saveCollectionDb(userId, {
      name:product?.name,
      price:product?.price,
      brand,
      images:product?.productImages,
      added: serverTimestamp(),
      productId: id,
      category,
    }).then(toast.success("Added to Collection"))
    
   }      
  }

  function addToCart() {
   if (isProductInCart) {
     toast.error("Item Already In Cart")
   }else{
    addProductToCart({
      productId: id,
      url: product.productImages,
      name:product.name,
      price:product.price,
      productQuantityAvailable:product?.quantity || 25,
      quantity:1,
      brand,
     })
     toast.success("Added To Cart")
   }
  }

 {return product !==null && <main>
  <section className='bg-blue-100 p-5 mt-3 text-xl font-medium md:text-2xl'>
    <span className='ml-1 tracking-wide hover:underline transition-all'><Link to={"/"}>Home/</Link></span>
    <span className='ml-1 tracking-wide hover:underline transition-all'><Link to={"/"}>Product/</Link></span>
    <span className='ml-1 tracking-wide hover:underline transition-all'><Link>{category}</Link></span>
  </section>
<main className='detailed-container grid grid-cols-2 lg:grid-cols-3 gap-5 mx-2 md:mx-5 lg:max-w-[77rem] lg:mx-auto my-8'>
  <section className='section-1'>
    {/* image section */}
    <section>
      {/* img-container */}
        <div className=''>
        <Slider ref={sliderRef} {...slide2}>
          {product.productImages.map((url,index)=>{
            return <div key={index} className=' w-full object-cover '>
              <img src={url} alt={index} className=' object-cover w-full h-[225px] md:h-[500px]'/>
            </div>
          })}
        </Slider>
        </div>
      {/* image-slider */}
    
      <footer className='mt-2.5'>
        <Slider {...settings}>
          {product.productImages.map((url,index)=>{
            return <div key={index} className=' w-full h-[80px] md:h-[100px] lg:h-[160px] p-2'>
              <img src={url} alt={index} className='border border-blue-700 object-cover w-full cursor-pointer hover:scale-105 hover:transition-all' onClick={()=>handleSlide(index)}/>
            </div>
          })}
        </Slider>
      </footer>
    </section>
      <h2 className=' text-2xl px-3 pt-3 font-bold mt-1.5'>{product.name}</h2>
      <h4 className='text-base md:text-lg  px-3 pt-3 text-slate-700  font-bold mb-3'>₦{product.price}</h4>
    {/* product-desc */}
    <section className='mx-3.5'>
      <article>
       <div className='flex justify-between mb-3 items-center'>
          <div className='flex items-center flex-col lg:flex-row'>
              <p className='flex items-center'> <img src={clock} alt=""className='w-5 mr-1' /> <Moment fromNow >{product.createdAt}</Moment></p>
              <span className='-ml-9 mt-2.5 lg:mt-0 lg:ml-4 flex items-center'><img src={brandIcon} alt="brand-icon" className='mr-1'/> {brand}</span>
          </div>
          <div>
            <img src={isSaved ? "https://img.icons8.com/ios-glyphs/30/000000/novel--v1.png" :loveIcon} alt='love' className='w-6 cursor-pointer' onClick={saveCollection}/>
          </div>
        </div> 
        
       <h3 className=' text-[14px] md:text-base tracking-[0.052rem]'> {product.description} </h3>
      </article>
      <button className='cart-btn'  onClick={addToCart}> <img src={cartIcon} alt=""className='w-6 mr-1.5'/>Add To Cart</button>
    </section>
  </section>

  <section className=' w-[97vw] lg:w-full'>
      <div className='bg-white shadow-lg p-4  drop-shadow-md shadow-slate-200' >
        <article className='flex gap-1.5 md:gap-3'>
        <div>
            <img src={product?.createdBy?.url} className='w-[50px] object-cover h-[50px] rounded-[50%]' />
          </div>
          <div>
            <h2 className='text-lg text-slate-700 md:text-xl font-medium '>{product?.createdBy?.name}</h2>
            <h2 className='text-sm text-slate-600 tracking-wider'>{product?.createdBy?.id}</h2>
          </div>
        </article>
        <button className='w-full text-white py-1.5 font-medium my-3 tracking-wide hover:brightness-115 transition-all bg-blue-700 rounded-[4px] flex justify-center items-center'> <img src={chatIcon} alt="chat-icon" className='w-5 mr-1'/> Start Chat</button>
      </div>

      <div className='text-center bg-white shadow-lg p-4 my-5 drop-shadow-md shadow-slate-200  rounded-[4px]'>
          <section className='border border-yellow-300 p-2 rounded-[4px] hover:bg-yellow-50 cursor-pointer'>
          <h2 className='text-yellow-500 font-medium tracking-wider'><Link to={`/product/${id}/${category}/${brand}/feedback`}>FeedBack({feedBacks.length})</Link></h2>
          </section>
      </div>

      <div className=' bg-white shadow-lg  shadow-slate-200 p-4 my-5 drop-shadow-md rounded-[4px]'>
        <h2 className='text-center font-bold text-xl text-slate-700 my-2'>Warnings!</h2>
        <ul className="">
          <li className='mt-1 text-sm tracking-wider text-slate-600'>Dont transfer money to any vendor or seller. </li>
          <li className='mt-1 text-sm tracking-wider text-slate-600'>Don't click on the received product button when your desired product has not been delivered.</li>
          <li className='mt-1 text-sm tracking-wider text-slate-600'>Malicious activites wont be condoled.</li>
        </ul>
      </div>
  </section>

 </main>
 
 <Toaster richColors closeButton={true} position="top-right"/>
 </main>}
}

export default Detailed