import { useEffect, useRef, useState } from "react"
import { auth, storage } from "../../firebase-config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { toast } from "sonner"
import load from '../../images/load.png'
import add from '../../images/add.png'
import { getProducts, saveProductToDb, updateProduct } from "../../actions/products/products"
import { serverTimestamp } from "firebase/database"
import { getCurrentUser } from "../../actions/auth/auth"
import "./products.css";
import Select from "react-select"
import { getSingleSeller } from "../../actions/sellers/sellers"
import { useSearchParams } from "react-router-dom"

const NewProduct = () => {
  const imageRef = useRef()
  const [vendor, setVendor] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [productValues, setProductValues] = useState({
    name:"",
    description: "",
    price: 0,
    productQuantity: 1
  })
  const [category, setCategory] = useState("")
  const [brands, setBrands] = useState("")
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [user, setUser] = useState([])
  const categoryOptions = [
    {label: "Beauty", value: "beauty"},
    {label: "Electronics", value: "electronics"},
    {label: "Fashion", value: "fashion"},
    {label: "Food", value: "food"},
    {label: "Pets", value: "pets"},
    {label: "Vehicles", value: "vehicles"}
  ]
  const brandOptions = {
    beauty:[
      {
        label:"Perfumes", value: "perfumes"
      },
      {
        label:"Make-up", value: "make-up"
      },
      {
        label:"Hair-beauty", value: "hair-beauty"
      },
      {
        label:"Skin-care", value: "skin-care"
      },
    ],
    electronics:[
      {label: "Laptops", value: "laptops"},
      {label: "Phones", value: "phones"},
      {label: "Video-games", value: "Video-games"},
      {label: "Tablets", value: "tablets"}
    ],
    fashion: [
      {label: "Bags", value: "bags"},
      {label: "Clothing", value: "clothing"},
      {label: "Shoes", value: "shoes"},
      {label: "Jewellery", value: "jewellery"},
      {label: "Watches", value: "watches"},
    ],
    food: [
      {label: "Cakes", value: "Cakes"},
      {label: "Snacks", value: "snacks"},
      {label: "Others", value: "others"},
    ],
    pets:[
      {label: "Dogs", value: "dogs"},
      {label: "Cats", value: "cats"},
      {label: "Rabbits", value: "rabbits"},
      {label: "Fish", value: "fish"},
      {label: "Reptiles", value: "reptiles"},
      {label: "Other Animals", value: "other-animals"},
    ],
    vehicles:[
      {label: "Cars", value: "cars"},
      {label: "Trucks", value: "trucks"},
      {label: "Buses", value: "buses"},
      {label: "WaterCrafts", value: "waterCrafts"},
    ]

  }
  const [params, setParams] = useSearchParams()
  const isEdit = params.get("edit")
  const productId = params.get("productId") 



  useEffect(()=>{
    getCurrentUser(setUser)
  },[])

  useEffect(()=>{
    getSingleSeller(auth?.currentUser?.uid, setVendor)
    getProducts(setIsFetching, setAllProducts)
  },[])

  const newProduct = allProducts.filter(product=> product[0] === productId )


  function handleValues(e){
    const {name, value} = e.target
    setProductValues(prev=>{
      return {...prev, [name]:value}
    })
  }

  function handleUpload(e){
    const files = e.target.files
    setFiles(files)
      if (files) {
        if (files.length <= 5) {
          for (const file of files) {
            if(file.type.startsWith("image/")){
              const url = URL.createObjectURL(file)
              setImages(prev =>{
                return [...prev, {url}]
              })
            }
            else{
              toast.error("Invalid file format")
            }
          }
        }
        else{
          toast.error("Images length must not be greater than 5")
        }
      }
}

 async function createProduct(e) {
    e.preventDefault()
    if(isEdit){
      const productImages = []
      const {name,description,price, productQuantity} = productValues
      setIsLoading(true)
      try {
        if( name && description && category && price && files.length > 0 && brands && productQuantity > 0 && productQuantity !== "") {
          for (const file of files) {
            const storageRef = ref(storage, `products/${file?.name}`)
            toast.success("Updating...")
            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef)
            productImages.push(url)
            
              if(productImages.length === files.length) {
                await updateProduct(productId, {
                  name:name.trim(),
                  description:description.trim(),
                  category:category?.value,
                  brands:brands?.value,
                  price:parseFloat(price),
                  productImages,
                  createdAt: serverTimestamp(),
                  createdBy:user,
                  quantity: productQuantity
                }).then(()=>{
                  toast.success("Product updated successfully")
                setProductValues({name: "", description: "", price: 0, productQuatity: ''})
                })
              }
          }        
         }else{
          toast.error(`Please fill out all field`)
         }
      } catch (err) {
        toast.error(err.message)
      }
      await quitEdit()
    }
    else{
      if (vendor) {
        if (vendor[0][1]?.pricingPlan === "Premium" && allProducts.length < 50) {
          newProductUpload()
  
        }  
        else if(vendor[0][1]?.pricingPlan === "basic" && allProducts.length < 20){
          newProductUpload()
        }
        else{
          toast.error("Upload Limit Exceeded")
        }
      } 
    }
  }

  function quitEdit() {
    window.location = "/dashboard/products"
  }

  async function newProductUpload(){
    const productImages = []
    const {name,description,price, productQuantity} = productValues
    setIsLoading(true)
    try {
      if( name && description && category && price && files.length > 0 && brands && productQuantity > 0 && productQuantity !== "") {
        for (const file of files) {
          const storageRef = ref(storage, `products/${file?.name}`)
          toast.success("Uploading...")
          await uploadBytes(storageRef, file)
          const url = await getDownloadURL(storageRef)
          productImages.push(url)
          
            if(productImages.length === files.length) {
              await saveProductToDb({
                name:name.trim(),
                description:description.trim(),
                category:category?.value,
                brands:brands?.value,
                price:parseFloat(price),
                productImages,
                createdAt: serverTimestamp(),
                createdBy:user,
                quantity: productQuantity
              }).then(()=>{
                toast.success("Product successfully added")
              setProductValues({name: "", description: "", price: 0, productQuatity: ''})
              })
            }
        }        
       }else{
        toast.error(`Please fill out all field`)
       }
    } catch (err) {
      toast.error(err.message)
    }
  }
  
  
  return (
    <main className="new-product-container mt-28 border" >
      <header className="new-product-header">
        <h2>{productValues.name.length <= 0 ? "[Untitled]": productValues.name}</h2>
        <h3>Creating new product</h3>
      </header>

      <section>
        <form action="" onSubmit={createProduct}>

          <section>
            <label htmlFor="name">Name*</label><br/>
            <input  onChange={handleValues} type="text" name="name" maxLength={27} placeholder={isEdit && newProduct.length > 0 ? newProduct[0][1]?.name : productValues.name}/>
          </section>

          <section>
            <label htmlFor="description" >Description*</label><br/>
            <textarea name="description" maxLength={200} onChange={handleValues} rows={3.5}  placeholder={isEdit && newProduct.length > 0 ? newProduct[0][1]?.description : productValues.description}/>
          </section>

          <section>
            <label htmlFor="price">Price in NGN*</label><br/>
            <input  onChange={handleValues} type="number" name="price" max={10000000} min={1}  placeholder={isEdit && newProduct.length > 0 ? newProduct[0][1]?.price : productValues.price}/>
          </section>

          <section>
            <label htmlFor="productQuantity">Product Quantity Available*</label><br/>
            <input  onChange={handleValues} type="number" name="productQuantity" max={25} min={1}  placeholder={isEdit && newProduct.length > 0 ? newProduct[0][1]?.quantity : productValues.quantity}/>
          </section>

          <section>
            <label htmlFor="category">Category*</label>
            <Select defaultValue={category} onChange={setCategory} options={categoryOptions} className="category"  placeholder={isEdit && newProduct.length > 0 ? newProduct[0][1]?.category : productValues.category} />
          </section>

         {category && <section>
            <label htmlFor="category">Brand*</label>
            <Select defaultValue={brands} onChange={setBrands} options={brandOptions[category?.value]} className="category"  placeholder={isEdit && newProduct.length > 0 ? newProduct[0][1]?.brand : productValues.brand}/>
          </section>
}
          <section >
            <img src={add} alt="add-icon"  className="add-icon" onClick={()=>imageRef.current.click()}/>
            <input type="file" multiple hidden ref={imageRef}  accept="image/" onChange={handleUpload}/>
            <section className="flex ">
              {images.map(image=>{
                return (
                  <div >
                    <img src={image.url} className="img" />
                  </div>
                )
              })}
            </section>
          </section>

            {/* <span>File format must in .jpg or .png</span> */}
         <footer className="flex items-center">
          <button  className="form-btn">
            <span>{isEdit ? "Edit Product" : "Add Product"}</span></button>
            {isEdit && <button  className="form-btn bg-blue-100 text-blue-700 ml-2" onClick={quitEdit}>
            <span>Cancel</span></button>}
         </footer>
        </form>
      </section>

      {/* <Toaster richColors position="top-right" closeButton/>  */}
    </main>
  )
}

export default NewProduct
