import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { getProducts } from "../../actions/products/products";
import "./products.css"
import filterIcon from "../../images/filter.png"
import notFoundImage from "../../images/not-found.gif"
import notFoundImage2 from "../../images/notFound.png"
import { SearchLoading } from "../../components/Loading";
import AOS from "aos"
import "aos/dist/aos.css"


const Search = () => {
  const [params] = useSearchParams()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const q = params.get("query")
  const [category, setCategory] = useState([])
  const [filterValues, setFilterValues] = useState({
    min: 0,
    max: 100000,
    sortBy: "popularity",
    category: "All"
  })

  const transition ={
    transition: "all .8s linear",
  }

 useEffect(()=>{
  getProducts(setIsLoading,setProducts)
 },[])

 useEffect(()=>{
  const categories = ["All",...new Set(products.map(product => product[1]?.category))]
  setCategory(categories)
 },[products])

 
 useEffect(()=>{
  AOS.init()
},[])
 

 if (isLoading) {
  return <SearchLoading />
 }

 function handleFilterValues(e) {
  const { name, value } = e.target 
  setFilterValues((prev)=>{
    return {...prev, [name]: value}
  })
 }

 function filterCatgory(cat) {
  setFilterValues((prev)=>{return {...prev, category:cat}})
  setShowFilters(!showFilters)
 }


 const searchedProducts = products.filter(product => product[1]?.name?.toLowerCase().includes(q) || product[1]?.description?.toLowerCase().includes(q) || product[1]?.category?.toLowerCase().includes(q)|| product[1]?.brand?.toLowerCase().includes(q))


 const filterProducts =  searchedProducts.filter(product => (filterValues.min !== "" ? product[1]?.price >= parseInt(filterValues.min): product[1]?.price >= 0) && (filterValues.max !== "" ?  product[1]?.price <= parseInt(filterValues.max) : product[1]?.price <=  100000) && (filterValues.category !== "All" ?  product[1]?.category === filterValues.category : searchedProducts))


 return (
  <main className="mt-2 mb-5 lg:my-7 " data-aos={"fade-up"} data-aos-duration={"900"}>
    <section className="bg-blue-100 p-5 w-full px-5">
        <span className="text-sm tracking-wide text-slate-600 ml-1"><Link to={"/"}>Home &gt; </Link></span >
        <span className="text-sm tracking-wide text-slate-600 ml-1"><Link to={"/"}>Product &gt;</Link></span >
        <span className="text-sm tracking-wide text-slate-600 ml-1"><Link>Search Result for "{q}"</Link></span>
    </section>
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-w-[72rem] py-12 mx-3 md:mx-auto md:px-3">
      
        <section className={showFilters ? "col-span-1  bg-white shadow-lg inset-y-0 z-[230] lg:z-20 left-0 right-[20%] md:right-1/2  shadow-slate-200 lg:shadow-none  fixed -translate-x-full lg:translate-x-0 lg:relative lg:bg-transparent" : "col-span-1  bg-white shadow-md inset-y-0 left-0 right-[20%] md:right-1/2  shadow-slate-200 lg:shadow-none  fixed  translate-x-0 lg:relative lg:bg-transparent"} style={transition}>
          <header className="flex lg:hidden justify-between mb-4 bg-blue-100 px-3 py-2.5">
              <h2 className="font-medium text-lg">Filters</h2>
              <button className=" text-base font-bold text-red-700 px-2 pb-0.5 -pt-1" onClick={()=>setShowFilters(!showFilters)}>
                <div className="sm-bar sm-bar-1"></div>
                <div className="sm-bar sm-bar-2"></div>
              </button>
          </header>
          <article className="px-4 py-2">
            <h2 className="font-medium mb-3 ">All Categories</h2>
            <section className="flex flex-col">
              {category.map(cat => {
                return <div>
                  <h2 className="my-1 hover:text-blue-700 tracking-wider cursor-pointer text-slate-600" onClick={()=>filterCatgory(cat)}>{cat}</h2>
                </div>
              })}
            </section>


            <hr className="my-3" />

            <h2 className="my-1.5 font-medium">Price in Naira(₦)</h2>
            <div>
              <article className="my-3 flex flex-row items-center">
                <label className="tracking-wide">Min: </label>
                <input type="number" className="border ml-1 w-1/2 px-1 py-1.5 border-slate-700 rounded-[4px]" name="min" id="" onChange={handleFilterValues}/><br />
              </article>
              <article className="my-3 flex flex-row items-center">
                <label className="tracking-wide">Max: </label>
                <input type="number" className="border w-1/2 ml-1 px-1 py-1.5 border-slate-700 rounded-[4px]" name="max"  id="" onChange={handleFilterValues}/><br />
              </article>
            </div>
          </article>
        </section>

       <section className="col-span-3">
            <header className="mb-5 block md:flex justify-between">
              <h3 className=" text-[21px] md:text-2xl lg:text-[26px] font-bold text-slate-700" >Search Results for "{q}"</h3>
             <div className="mt-7 md:mt-0 flex justify-between lg:justify-normal items-center">
              <select name="sortBy" id="" placeholder="Relevance" className="border-b outline-none text-slate-600 tracking-wider text-sm cursor-pointer"onChange={handleFilterValues} >
                  <option value="popularity">Sort by Popularity</option>
                  <option value="price">Sort by Price: Low to High</option>
              </select>
                <article onClick={()=>setShowFilters(!showFilters)} className="flex items-center  lg:hidden ml-1.5">
                  <img src={filterIcon} alt="" className="w-5" onClick={()=>setShowFilters(!showFilters)} />
                  <button className="font-medium  ml-1" onClick={()=>setShowFilters(!showFilters)} >Filters</button>
                </article>
             </div>
            </header>
            { <>
            {searchedProducts.length > 0 ?  <main>
            {filterProducts.length > 0 ? 
              <section className="grid-view">
                {filterProducts.reverse().map(item =>{
                return <div>
                  <Link to={`/product/${item[0]}/${item[1]?.category}/${item[1]?.brands}`}>
                  <img src={item[1]?.productImages} className={"rounded-[4px] w-full h-[250px] md:h-[350px] object-cover"}/>
                  <article className="my-1.5">
                    <div>
                      <h2 className={"font-bold text-sm md:text-base text-left tracking-wider"} style={{fontFamily: "Arial"}}>{item[1]?.name}</h2>

                      <h2 className=" text-xs md:text-sm tracking-wider my-0.5 text-slate-600">₦{item[1]?.price}</h2>
                    </div>
                  </article>
                  </Link>
                </div>
              })}
              </section>
            : 
            <section className="-mt-10 block md:flex flex-col items-center justify-center lg:block">
            <img src={notFoundImage2} alt="" className="w-[350px]"/>
            <h2 className="text-sm tracking-widest text-center md:text-left text-slate-600">Sorry! The filter for "{q}" is empty</h2>
        </section>
            }
          </main>: <section className="-mt-10 block md:flex flex-col items-center justify-center lg:block">
              <img src={notFoundImage} alt="" />
              <h2 className="text-sm tracking-widest text-center md:text-left text-slate-600">Sorry! "{q}" was not found in our catalogue</h2>
          </section>}</>}
        </section> 
    </main>
  </main>
  )
}

export default Search


