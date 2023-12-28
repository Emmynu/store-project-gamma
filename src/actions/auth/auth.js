import { getDatabase, onValue, push,ref, update } from "firebase/database"
import { auth, db } from "../../firebase-config"
import { onAuthStateChanged, updateProfile } from "firebase/auth"

export async function saveUserToDb(id,name,email,password,url){
  push(ref(db, `users/${id}`),{
    name,
    email,
    url,
    id,
    password,
  })
  
}

export async function getAllUsersInDb(usersContainer){
  onValue(ref(db, `users/`),res=>{
   res.exists() ?  usersContainer(Object.entries(res.val())) : usersContainer([])
  })
}

export async function getCurrentUser (user){
  onAuthStateChanged(auth,res =>{
    user({
      id:res?.uid,
      name:res?.displayName,
      email:res?.email,
      url:res?.photoURL
    })
  })
}

export const id = localStorage.getItem("id")


export async function updateUserProfile(name,url) {
  updateProfile(auth?.currentUser, {
    displayName:name,
    photoURL:url
  })
  const updates = {}
  updates[`/users/${id}/name`] = name
  updates[`/users/${id}/url`] = url
  update(getDatabase())
}