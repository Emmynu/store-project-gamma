import { push, ref, onValue, remove } from "firebase/database"
import { id } from "../auth/auth"
import { db } from "../../firebase-config"


export const createSeller = async (plan) => {
  push(ref(db, `vendors/${id}`), {
    pricingPlan:plan
  })  
}

export function getSellers(sellers){
  onValue(ref(db,`vendors/`), res =>{ 
    res.exists() ? sellers(Object.entries(res.val())) : sellers([])
  })
}


export async function getSingleSeller(id,seller) {
  onValue(ref(db, `vendors/${id}`),res=>{
    res.exists() ? seller(Object.entries(res.val())) : seller([])
  })
}
