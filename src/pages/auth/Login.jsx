import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link,Form, useNavigation } from "react-router-dom"
import { Toaster, toast } from "sonner";
import { auth, provider } from "../../firebase-config";
import load from "../../images/load.png"
import loading from "../../images/loading.png"
import { useEffect, useState } from "react";
import { getAllUsersInDb, saveUserToDb } from "../../actions/auth/auth";

export async function loginAction({ request }){
  const form = await request.formData()
  const formData = Object.fromEntries(form)
  const formValue = Object.values(formData)
  
  if(formValue.includes("") ){
    toast.error("Please fill out all fields")
}
  else{
    try {
      await signInWithEmailAndPassword(auth, formData.email,formData.password).then(res=>{
        localStorage.setItem("id" , res?.user?.uid)
        setTimeout(() => {
          window.location = "/"
        }, 2000);
      })
    
      toast.success("Sucessfully logged in")
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  return null
}

const Login = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(()=>{
    getAllUsersInDb(setUsers)
  },[])

 async function logInWithGoogle() {
  setIsLoading(true)
   try {
    await signInWithPopup(auth,provider)
    const { displayName,uid,photoURL, email} = auth.currentUser
    if (!users.find(user => user[1].id === uid)) {
      await saveUserToDb(uid,displayName,email,null,photoURL)
    }
    toast.success("Successfully logged in")
    localStorage.setItem("id" , uid)
    setTimeout(() => {
      window.location = "/"
    }, 2000);
    setIsLoading(false)
   } catch (error) {
    toast.error(error.message)
    setIsLoading(false)
   }
  }
  return (
    <main className="form-container">
      <Form method="POST">
        <header className="form-header">
          <div>
            <img width="64" height="64" src="https://img.icons8.com/hatch/64/ff00ff/bear.png" alt="bear"/>
            </div>

          <div>
           <h2>Welcome Back!</h2>
           <h6><Link to="/register">Create an account  &rarr; </Link></h6>
          </div>
        </header>

        <section className="form-content">
          <input type="email" name="email"  placeholder="Email"/>
        </section>

        <section className="form-content">
          <input type="password" name="password" placeholder="Password"/>
        </section>

        <h6 className="forgot-password-link"><Link to="/find-account">Forgot Password?</Link></h6>

        <button className="form-btn mt-0" disabled={navigation.state==="submitting"}>
          {navigation.state==="submitting"  ? <img src={load} className="w-[23px] animate-spin" /> : <span> Log In</span>}
        </button>
      </Form>
      <Toaster richColors position="top-right" closeButton/>

      <section className="form-option">
        <div></div>
        <h2>OR</h2>
        <div></div>
      </section>

      <button className="form-email form-btn" disabled={isLoading} onClick={logInWithGoogle}>
        {isLoading ? <img src={loading} className="w-[23px] animate-spin" /> : <span>Continue with Google</span>}
      </button>
    </main>
  )
}

export default Login
