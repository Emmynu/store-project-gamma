import { push, ref, onValue } from "firebase/database"
import { id } from "../auth/auth"
import { db } from "../../firebase-config"


export const createSeller = (plan) => {
  push(ref(db, `vendors/${id}`), {
    pricingPlan:plan
  })  
}

export function getSellers(sellers){
  onValue(ref(db,`vendors/`), res =>{
    res.exists() ? sellers(Object.entries(res.val())) : sellers([])
  })
}

