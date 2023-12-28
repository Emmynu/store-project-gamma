import { onValue, push, ref } from "firebase/database";
import { db } from "../../firebase-config";

export async function saveProductToDb(data){
  push(ref(db, `products/`),data)
}

export async function getProducts(isLoading,products) {
  isLoading(true)
  onValue(ref(db, `products`),res=>{
    res.exists() ? products(Object.entries(res.val())) : products([])
    isLoading(false)
  })
}

export async function getSingleProduct(id, product) {
  onValue(ref(db, `products/${id}`),res => {
    res.exists() ? product((res.val())) : product([])
  })
}
