import { db } from "../../firebase-config";
import { id } from "../auth/auth";
import { push, ref, onValue,remove } from "firebase/database";


export async function addProductToCart(data) {
  push(ref(db, `cart/${id}`),data)
}

export async function getCart(cart){
  onValue(ref(db, `cart/${id}`), res=>{
    res.exists() ? cart(Object.entries(res.val())) : cart([]) 
  })
}

export async function removeItemFromCart(productId){
  try {
    remove(ref(db, `cart/${id}/${productId}`))
  } catch (err) {
    console.log(err.message);
  }
}