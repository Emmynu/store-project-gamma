import { useEffect, useRef, useState } from "react"
import test from "../../images/test.jpg"
import { Link } from "react-router-dom"
import { getProducts } from "../../actions/products/products"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import arrowIcon from "../../images/left-arrow.png"
import quickIcon from "../../images/quick.png"
import refundIcon from "../../images/refund.png"
import qualityIcon from "../../images/quality.png"
import Loading from "../../components/Loading"
import AOS from "aos"
import "aos/dist/aos.css"

const Home = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const sliderRef = useRef(null)
  const categoryRef = useRef(null)
  const homeSliderRef = useRef(null)

  const imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000
  };
 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive:[
      {
        breakpoint:1024,
        settings:{
          slidesToShow:2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint:768,
        settings:{
          slidesToShow:1,
          slidesToScroll:1,
        }
      },
    ]
  }

  const homeImageSlider = {
    dots:false,
    autoplay:true,
    speed:1000,
    autoplaySpeed:3000,

  }


  useEffect(()=>{
    getProducts(setIsLoading,setProducts)
  },[])

  useEffect(()=>{
    AOS.init()
  },[])

  function handlePrev(ref) {
    ref.current.slickPrev()
  }

  function handleNext(ref) {
    ref.current.slickNext()
  }

  return (
   <main className="overflow-hidden">
      {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-10 items-center text-left">
          <div>
          <h2 className=" text-4xl sm:text-6xl font-bold leading-tight max-w-2xl text-slate-600">
            We are changing the way people shop
          </h2>
          <p className="text-[15px] mt-5 tracking-wider max-w-xl text-slate-600 ">Discover exclusive deals and elevate your style with our curated collection. Shop now for unparalleled quality and unbeatable prices!</p>
          <button className="mt-2.5 bg-blue-600 tracking-wider hover:bright text-white px-3 py-2 rounded-[4px]" ><Link>Start Exploring &rarr;</Link></button>
        </div>
        <div>
          <img src={test} alt="" className="hidden lg:block " />
        </div>
      </section> */}


      <section className="grid grid-cols-3  lg:grid-cols-4 gap-0 lg:gap-1 overflow-x-hidden">
        <div className="col-span-3 w-full relative">
          <div className="bg-black absolute w-full z-20 inset-0 opacity-60">
            <section className=" z-50">
                <button onClick={()=>handlePrev(homeSliderRef)} className="absolute top-[45%] left-0 md:left-4 z-40"><img className="w-8" src={arrowIcon} alt="" /></button>
                <button onClick={()=>handleNext(homeSliderRef)} className="absolute top-[45%]  z-40 rotate-180 right-0 md:right-4"><img className="w-8" src={arrowIcon} alt="" /></button>
            </section>
           
          </div>
         <article>
          <h2 style={{fontFamily:"Arial"}} className=" text-3xl  md:text-5xl  max-w-2xl font-bold text-white z-50 absolute top-[18%] left-[9%] text-left" data-aos={"fade-up"} data-aos-duration={"1000"}  data-aos-anchor-placement={"top-bottom"}>
              We are changing the way people shop
            </h2>

            <p className="text-sm md:text-[15px] absolute top-[37%] md:top-[45%] lg:top-[38%]  left-[9%] font-medium mt-5 tracking-wider mr-4 sm:max-w-lg z-50  text-white" data-aos={"fade-up-right"} data-aos-duration={"1500"}>Discover exclusive deals and elevate your style with our curated collection. Shop now for unparalleled quality and unbeatable prices!</p>

          
            <button style={{fontFamily:"Arial"}} className="mt-5 absolute top-[63%] md:top-[70%] lg:top-[56%] z-50 left-[9%] text-sm bg-blue-600 tracking-wider hover:bright text-white px-3 py-2 rounded-[4px]" data-aos={"zoom-in"} data-aos-duration={"2000"}><Link>Start Exploring &rarr;</Link></button>
            
         </article>
          
         <Slider {...homeImageSlider} ref={homeSliderRef}>
            {/* <section>   */}
            <article>
                <img src="https://images.pexels.com/photos/375889/pexels-photo-375889.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="w-full h-[350px] lg:h-[500px] object-cover" />
              </article>
              <article>

                <img src="https://images.pexels.com/photos/399635/pexels-photo-399635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="w-full  h-[350px] lg:h-[500px] object-cover" />
              </article> 
              <article>
                <img src="https://images.pexels.com/photos/1860160/pexels-photo-1860160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="w-full  h-[350px] lg:h-[500px] object-cover" />
              </article>
            {/* </section> */}
          </Slider>
        </div>

        <div className="col-span-3 lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-1.5">
          <article>
            <img src="https://images.pexels.com/photos/2817452/pexels-photo-2817452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="object-cover h-[200px] lg:h-[250px] w-full" />
          </article>
            <article>
            <img src="https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="object-cover h-[200px] lg:h-[250px] w-full " />
          </article>
        </div>
      </section>
      
      {/* products */}
     {<section className="mt-[3rem] products-container relative px-4 md:px-7 lg:px-12" data-aos={"fade-up"} data-aos-duration={"700"}>
        <header>
          <h2 className="text-2xl md:text-[28px] text-center md:leading-7 text-slate-700 tracking-wider font-bold ">Featured Products</h2>
          <hr className="my-6 bg-blue-300 h-[1px]"/>
        </header>
        {/* products */}
       {isLoading ? <Loading /> : <>
        <section className="my-8 ">
            <Slider {...settings} ref={sliderRef}>
              {products.slice(0,18).reverse().map(item =>{
                return <div className="p-2 md:p-4 bg-white rounded-[4px] shadow-slate-300 cursor-pointer shadow-xl hover:scale-105 transition-all">
                  <Link to={`/product/${item[0]}/${item[1]?.category}/${item[1]?.brands}`}>
                  <section>
                      <div >
                        <Slider {...imageSliderSettings}>
                          {item[1]?.productImages.map(url =>{
                            return <div className="w-full ">
                                <img src={url} className="object-cover h-64 rounded-[4px] w-full"/>
                            </div>
                          })}
                    </Slider></div>
                    <section className="text-center my-1">
                        <h2 className="text-lg text-slate-700 font-bold tracking-wider">{item[1]?.name}</h2>
                        <h4 className="text-sm my-2 text-slate-500 tracking-wide">₦{item[1]?.price}</h4>
                    </section>
                    </section>
                    </Link>
                </div>
              })}
            </Slider>
          </section>
          <div className="">
              <button onClick={()=>handlePrev(sliderRef)} className="bg-white absolute top-[47%] left-2 md:left-[3%] px-2 py-5">
                <img src="https://img.icons8.com/ios-filled/50/back.png"  alt="left-arrow" className="w-5" />
              </button>
              <button onClick={()=>handleNext(sliderRef)} className="bg-white top-[47%] px-2 py-5 absolute right-2 md:right-[3%] rounded-e-[2px]">
                <img src="https://img.icons8.com/ios-filled/50/back.png" alt="left-arrow" className="w-5" style={{transform:"rotate(-180deg)"}}/>
              </button>
            </div>
       </>}
      </section>}

      <hr className="my-6 bg-blue-300 h-[1px]"/>


      {/* collections */}
      <section className="my-[4rem] mb-[2rem] px-4 md:px-7 lg:px-12 relative" data-aos={"fade-up"} data-aos-duration={"700"}>
        <h2 className="text-2xl md:text-[29px] text-center md:leading-7 text-slate-700 tracking-normal font-bold mb-7" style={{fontFamily:"Arial"}}>Trending Categories</h2>
        <Slider {...settings} className=" mx-1 sm:mx-3 " ref={categoryRef}>
          <Link>
            <article className="px-2 sm:px-4">
              <img src="https://images.pexels.com/photos/234220/pexels-photo-234220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  className="w-full sm:w-[95%] outline-none h-[250px] rounded-[4px] object-cover"/>
              <h2  className="text-center my-1.5 text-lg font-semibold">Beauty</h2>
            </article>
          </Link>

          <Link>
            <article className="px-2 sm:px-4">
                <img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  className="w-full sm:w-[95%] outline-none h-[250px] rounded-[4px] object-cover"/>
                <h2  className="text-center my-1.5 text-lg font-semibold">Electronics</h2>
              </article>
          </Link>

          <Link>
            <article className="px-2 sm:px-4">
              <img src="https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  className="w-full sm:w-[95%] outline-none h-[250px] rounded-[4px] object-cover"/>
              <h2  className="text-center my-1.5 text-lg font-semibold">Fashion</h2>
            </article>
          </Link>

          <Link>
          <article className="px-2 sm:px-4">
              <img src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  className="w-full sm:w-[95%] outline-none h-[250px] rounded-[4px] object-cover"/>
              <h2  className="text-center my-1.5 text-lg font-semibold">Food</h2>
            </article>
          </Link>

          <article className="px-2 sm:px-4">
            <img src="https://images.pexels.com/photos/2215599/pexels-photo-2215599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  className="w-full sm:w-[95%] outline-none h-[250px] rounded-[4px] object-cover"/>
            <h2  className="text-center my-1.5 text-lg font-semibold">Pets</h2>
          </article>

          <Link>
          <article>
            <img src="https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""  className="w-full sm:w-[95%] outline-none h-[250px] rounded-[4px] object-cover"/>
            <h2  className="text-center my-1.5 text-lg font-semibold">Vechicles</h2>
          </article>
          </Link>
        </Slider>

        {/* arrows */}
        <article>
          <div onClick={()=>handlePrev(categoryRef)}>
          <img src="https://img.icons8.com/ios-filled/50/back.png" alt="back" className="w-6 absolute top-[46%] cursor-pointer left-0 md:left-6"/>
          </div>

          <div onClick={()=>handleNext(categoryRef)}>
            <img src="https://img.icons8.com/ios-filled/50/back.png" alt="" className="w-6 rotate-180 absolute top-[46%] cursor-pointer right-0 md:right-6"/>
          </div>
        </article>
      </section>
      

      <div className="px-3" data-aos={"fade-up"} data-aos-duration={"700"}>
      <section className="bg-blue-50 py-[4.5rem] md:py-[7rem] px-6 items-center align-middle  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14 lg:gap-24">
            <div data-aos={"fade-right"} data-aos-offset={"100"} data-aos-easing={"ease-in-sine"}>
            <div className="flex justify-center md:justify-start"> <img src={quickIcon} alt="" className="bg-blue-100 rounded-[50%] p-2 w-12"/></div>
              <p className="text-center md:text-left my-3 text-slate-600 text-[13px] tracking-wider"> Swift dispatch, your order reaches you promptly. Experience rapid delivery, bringing your satisfaction to your doorstep without delay.</p>
            </div>
            <div data-aos={"fade-right"} data-aos-offset={"120"} data-aos-easing={"ease-in-sine"}>
              <div  className="flex justify-center md:justify-start"><img src={qualityIcon} alt="" className="bg-blue-100 rounded-[50%] p-2 w-11" /></div>
              <p  className="text-center md:text-left my-3 text-slate-600 text-[13px] tracking-wider"> Experience excellence with our premium products. Enjoy confidence in your purchase with our hassle-free returns and swift refunds policy.</p>
            </div>
            <div data-aos={"fade-right"} data-aos-offset={"150"} data-aos-easing={"ease-in-sine"}>
              <div className="flex justify-center md:justify-start"><img src={refundIcon} alt=""className="bg-blue-100 rounded-[50%] p-2 w-12" /></div>
              <p  className="text-center md:text-left my-3 text-slate-600 text-[13px] tracking-wider"> Quality guaranteed! Easy returns and quick refunds. Shop with confidence, knowing we prioritize your satisfaction throughout the entire shopping experience.</p>
            </div>
      </section>
      </div>

      {/*  */}
   </main>
  )
}



export default Home