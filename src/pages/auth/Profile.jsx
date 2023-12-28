import { useEffect, useState } from 'react'
import CustomerSideBar from '../../components/sideBar'
import { getAllUsersInDb, getCurrentUser, updateUserProfile } from '../../actions/auth/auth'
import "./auth.css"
import { Form } from 'react-router-dom'
import { toast } from 'sonner'


export async function updateProfileAction({ request }){
  const data = await request.formData()
  const inputdata = Object.fromEntries(data)
  if(Object.values(inputdata).includes("")){
    toast.error("Invalid Form Input")
  }
  else{
    updateUserProfile(inputdata, null)
  }
  return data
}

const Profile = () => {
  const [users, setUser] = useState([])

  useEffect(()=>{
    getAllUsersInDb(setUser)
  },[])

  const user = users.filter()


  return (
    <main className={"grid grid-cols-1 md:grid-cols-3  max-w-[72rem] pb-12   mx-3 md:mx-auto md:px-3 items-start  gap-9  my-3 lg:my-12"}>
     <section className='hidden lg:block '>
        <CustomerSideBar />
     </section>

     <Form className='profile-container' method='POST'>
        <header>
          <h2 >Profile</h2>
        </header>
        <section className="profile-input-container">
          <article>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder={user?.name}/>
          </article>

          <article>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={user?.email} disabled/>
          </article>

          <article>
            <label htmlFor="name">Hash ID</label>
            <input type="text" name="name" id="name" value={user?.id} disabled/>
          </article>

          <article>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={user?.password} disabled/>
          </article>

          <button className='form-btn shadow-md lg:mt-9' >Save Changes</button>
        </section>
     </Form>
   
    </main>
  )
}

export default Profile
