import { useEffect, useState } from "react"
import { getAllUsersInDb } from "../../actions/auth/auth"
import load from "../../images/load.png" 
import { Toaster, toast } from "sonner"


const ForgotPassword = () => {
  const [hash, setHash] = useState("")
  const [isLoading , setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState([])

  useEffect(()=>{
    getAllUsersInDb(setUsers)
  },[])
  
  async function findAccount(e){
    e.preventDefault()
    setIsLoading(true)

    if (hash.length > 0) {
        setIsLoading(false)
        const user = users.filter(user => user[0] === hash.trim())
        if(user.length > 0){
          setNewUser(user)
        }
        else{
          toast.error("User Not Found!")
          setNewUser([])
        }
    }
    setIsLoading(false)
    setHash("")
  }

console.log(users, newUser);
  return (
    <main className="form-container">
      <form method="POST" onSubmit={findAccount}>
        <header className="form-header">
            <div>
              <img width="64" height="64" src="https://img.icons8.com/hatch/64/ff00ff/bear.png" alt="bear"/>
            </div>

            <div>
              <h2>Find Your Account</h2>
              <h3 className="text-sm tracking-wide">Enter your <strong> hash ID</strong> and we'll take it from there!</h3>
            </div>
          </header>

          <section className="form-content">
            <input type="text" name="id"  placeholder="Hash ID" value={hash} onChange={(e)=>setHash(e.target.value)}/>
        </section>

        <button className="form-btn" disabled={isLoading}>
          {isLoading ? <img src={load} className="w-[23px] animate-spin" /> : <span>Next</span>}
        </button>
      </form>
      
      <section>
        {newUser.length > 0 &&  <section>
          <section  className="bg-blue-100 p-1.5 rounded-[4px]">
            {newUser && newUser.map(person=>{
              const newestUser = person && Object.entries(person[1])
              return <main>
              {newestUser.map(user => {
                return <main  className="user-container">
                  <section>
                  <img src={user[1]?.url} alt={user[1]?.id} />
                </section>
                <section className="user-content">
                  <h2>{user[1]?.name}</h2>
                  <h3>Password: {user[1]?.password}</h3>
                </section>
                </main>
              })}
            </main> 
            })}
           </section>
          </section>}
      </section>
      <Toaster position="top-right" richColors closeButton/>
    </main>
  )
}

export default ForgotPassword


{/*  */}