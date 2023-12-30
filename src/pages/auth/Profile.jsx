import { useEffect, useRef, useState } from 'react'
import CustomerSideBar from '../../components/sideBar'
import { getSingleUserFromDb, id, updateUserProfile } from '../../actions/auth/auth'
import "./auth.css"
import { toast } from 'sonner'
import { auth, storage } from '../../firebase-config'
import { ref as bucketRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import camera from "../../images/camera.png"



const Profile = () => {
  const [user, setUser] = useState([])
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const profileRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setUrl] = useState(null)
  const [files, setFiles] = useState(null)



  useEffect(()=>{
    getSingleUserFromDb(id,setUser)
  },[])

 
  function handleUpload(e) {
      const file = e.target.files[0]
      console.log(file);
      if(file){
        if(file.type.startsWith("image/")){
          const url  = URL.createObjectURL(file)
          setUrl(url)
          setFiles(file)
        }
        else{
          toast.error("Invalid File Format")
        }
      }
      else{
        toast.error("Please select a file")
      }
  }

 async function updateProfilePicture() {
  setIsLoading(true)
    if (url && files) {
     try {
      const storageRef = bucketRef(storage, `profile/${auth?.currentUser?.uid}/${files.name}`)
      await uploadBytes(storageRef, files)
      const url = await getDownloadURL(storageRef)
      console.log(url);
      user.map(person => {
        updateUserProfile(auth?.currentUser?.displayName, url, person[0]).then(res =>{
          toast.success("Sucessfully updated your avatar")
          setIsModalOpen(false)
          setUrl(false)
          setFiles(false)
          setIsLoading(false)
        })
      })
     } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
     }
    }   
    else{
      toast.error("Please select a file")
       setIsLoading(false)
    }
  }



  function clear() {
    setFiles(null)
    setUrl(null)
  }
  

 
 async function updateProfile(e) {
    e.preventDefault()
    setIsLoading(true)
    if (name.length > 0 ) {
        try {
        user.map(person=>{
          updateUserProfile(name, person[1]?.url , person[0]).then(res=>{
            toast.success("Successfully updated your profile")
            setIsLoading(false)
          })
        })
        } catch (error) {
          toast.error(error.message);
        }
  
    } else {
      toast.error("Invalid form input")
    }

  }

  return (
    <main className={"grid grid-cols-1 md:grid-cols-3  max-w-[72rem] pb-12   mx-3 md:mx-auto md:px-3 items-start  gap-9  my-3 lg:my-12"}>
     <section className='hidden lg:block '>
        <CustomerSideBar />
     </section>
      <section className='profile-container'> 
      <header>
          <h2 >Profile</h2>
        </header>

        <article className='mt-4'>
          <img src={auth?.currentUser?.photoURL} alt="" className='w-[50px] object-cover rounded-[50%] h-[50px]' onClick={()=>setIsModalOpen(!isModalOpen)}/>
          <input type="file" name="" hidden accept='image/' id="" multiple={false} ref={profileRef} onChange={handleUpload}/>
       </article>

       <form  method='POST' onSubmit={updateProfile}>
        <section className="profile-input-container">
          <article>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder={auth?.currentUser?.displayName}/>
          </article>

          <article>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"  disabled value={auth?.currentUser?.email}/>
          </article>

          <article>
            <label htmlFor="name">Hash ID</label>
            <input type="text" name="name" id="name"  disabled value={auth?.currentUser?.uid}/>
          </article>

          <article>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"  disabled value={auth?.currentUser?.password || "...."}/>
          </article>

          <button className='form-btn shadow-md lg:mt-9' >{isLoading ? "Loading..." :"Save Changes"}</button>
        </section>
      </form>
    </section>
   
    {/* modal */}
    {isModalOpen && <div className="w-11/12 md:w-6/12 lg:w-1/3  absolute top-42 left-[50%] translate-x-[-50%] bg-white shadow-slate-100 border border-blue-600 outline-none rounded-mdx shadow-md ">
     <header className='flex justify-between items-center bg-blue-200 py-3 px-3'>
      <h2 className='text-lg sm:text-xl text-slate-700 font-medium'>Update Avatar</h2>
        <button onClick={()=>setIsModalOpen(false)}>
            <div className="sm-bar sm-bar-1"></div>
            <div className="sm-bar sm-bar-2"></div>
          </button>
     </header>
    <section className='p-4'>
      {url ? <img src={url} alt="" onClick={clear} className='w-full h-[300px] object-cover'/> : <h2 onClick={()=>profileRef.current.click()} className='flex justify-center items-center cursor-pointer'><img src={camera} alt='camera'/></h2>}
      <button className={url ? "bg-blue-700 w-full px-5 py-2 rounded-[4px] text-white font-medium mt-3 text-center" : "bg-blue-100 w-full px-5 py-2 rounded-[4px] text-slate-400 font-medium mt-3 text-center"} onClick={updateProfilePicture}>{isLoading ? "Loading..." : "Save Changes"}</button>
    </section>

        
      </div>}
    </main>
  )
}

export default Profile
