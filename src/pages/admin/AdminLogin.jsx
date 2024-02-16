import { Form, useNavigation } from "react-router-dom"
import { Toaster, toast } from "sonner"
import load from "../../images/load.png"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase-config"


export const AdminHash = "12345"
export async function adminLoginAction({ request }) {
  const data = await request.formData()
  const { email, password, hash} = Object.fromEntries(data)
  const values = Object.values(Object.fromEntries(data))

  if (values.includes("")) {
    toast.error("Invalid form input")
  } else {
    if(email === "oketunbi.olufunke@gmail.com" && password === "PriN35s*" && hash === AdminHash){
      toast.success(`Welcome Back Emmanuel`)
      localStorage.setItem("id", hash)
      signOut(auth)
      .then( 
        setTimeout(() => {
        window.location = "/admin"
      }, 1500))
     .catch(err=>{
      toast.error(err.message)
     })
    }else{
      toast.error("Invalid Credentials")
    }
  }
  return data
}

const AdminLogin = () => {
  const navigation = useNavigation()
  return (
    <main className="bg-white shadow-md border-t-[5px] w-[95%] h-[50vh] md:w-7/12 md:h-fit lg:w-1/3  rounded-[5px] m-[8%_auto_0]  md:m-[10%_auto_0] p-5 border-blue-700">
        <header className="text-center">
          <h2 className="text-2xl font-[arial] my-1.5 tracking-wider text-slate-700">Admin Login</h2>
        </header>
        <Form  method="POST" className="flex flex-col my-2">
          <article>
            <input className="w-full rounded-[4px] border my-1.5 border-slate-600 text-slate-600 tracking-wider px-3 text-sm py-1.5" placeholder="Email" type="email" name="email"  />
          </article>
          <article>
            <input className="w-full rounded-[4px] border my-1.5 border-slate-600 text-slate-600 tracking-wider px-3 text-sm py-1.5" placeholder="Password" type="password" name="password"  />
          </article>
          <article>
            <input className="w-full rounded-[4px] border my-1.5 border-slate-600 text-slate-600 tracking-wider px-3 text-sm py-1.5" placeholder="Admin Hash" type="text" name="hash"  />
          </article>
          <button className="bg-blue-700 text-slate-50 mt-2 tracking-wider flex justify-center font-medium rounded-[4px] py-2" disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? <img src={load} alt="load " className="animate-spin w-5"/> : "Login"} </button>
        </Form>
        <Toaster richColors position="top-right"/>
    </main>
  )
}

export default AdminLogin
