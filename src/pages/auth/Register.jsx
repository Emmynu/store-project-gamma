import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner"
import { auth, provider } from "../../firebase-config";
import load from "../../images/load.png"
import loading from "../../images/loading.png"
import hide from "../../images/hide.png"
import show from "../../images/show.png"
import "./auth.css"
import { getAllUsersInDb, saveUserToDb } from "../../actions/auth/auth";



const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [view, setView] = useState(false)


  useEffect(()=>{
    getAllUsersInDb(setUsers)
  },[])

  async function registerWithGoogle() {
    setIsLoading(true)
  try {
    await signInWithPopup(auth,provider)
    const { displayName,uid,photoURL, email}= auth.currentUser
    if (!users.find(user=> user[1]?.id === uid)) {
      await saveUserToDb(uid,displayName,email,null,photoURL)
    }
    await sendPasswordResetEmail(auth, auth.currentUser.email)
    toast.success("Sucessfully created an account!")
    setIsLoading(false)
    window.location = "/login"
  } catch (error) {
    console.log(error);
    toast.error(error.message)
    setIsLoading(false)
  }
  }

async  function createNewUser(e) {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(e.currentTarget))
  setIsLoading(true)
  if(Object.values(formData).includes("")){
    toast.error("Fill out all input fields")
  }
  else{
    try{
        // create user
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        // update user profile 
        await updateProfile(auth.currentUser, {
            displayName:formData.name,
            photoURL: "https://images.pexels.com/photos/19043170/pexels-photo-19043170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          })
          // check if the user doesnt exist to save user to db
          const {uid,displayName,email,photoURL} =  auth?.currentUser
          if (!users.find(user => user[1]?.id === uid)) {
            await saveUserToDb(uid,displayName,email,formData.password,photoURL)
          }

          // send welcome email
          await sendPasswordResetEmail(auth, auth.currentUser.email)
          toast.success("Sucessfully created an account!")
          setIsLoading(false)
          window.location = "/login"

      }
      catch(err){
        toast.error(err.message)
        setIsLoading(false)
      }
  }
  
  }
  return (
    <main className="form-container">
      <form  onSubmit={createNewUser}>
        <header className="form-header">
          <div>
            <img  src="https://img.icons8.com/hatch/64/ff00ff/bear.png" alt="bear" />
            </div>

          <div className="-mt-1">
           <h2>Create An Account</h2>
           <h6><Link to="/login">Log in to account  &rarr; </Link></h6>
          </div>
        </header>

        <section className="form-content">
          <input type="text" name="name" placeholder="Username"/>
        </section>

        <section className="form-content">
          <input type="email" name="email"  placeholder="Email"/>
        </section>

        <section className=" flex items-center justify-between border w-full outline-none border-slate-800 bg-transparent py-1.5 text-[15px] mt-3 text-slate-600 px-2 tracking-wide rounded-[3px] ">
          <input type={view ? "text": "password"} name="password" placeholder="Password" className="border-none outline-none  w-full p-0"/>
          <img src={view ? hide : show} className="w-4 cursor-pointer" onClick={()=>setView(!view)}/>
        </section>

        <button className="form-btn " >
          {isLoading ? <img src={load} className="w-[23px] animate-spin" /> : <span>Register</span>}
        </button>
      </form>
      <section className="form-option">
        <div></div>
        <h2>OR</h2>
        <div></div>
      </section>

      <button className="form-email form-btn" onClick={registerWithGoogle} disabled={isLoading}>
        {isLoading ? <img src={loading}  className="w-[23px] animate-spin" /> : <span>Continue with Google</span>}
      </button>
      <Toaster richColors position="top-right" closeButton/>
      
    </main>
  )
}

export default Register
