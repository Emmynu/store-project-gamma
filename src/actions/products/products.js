import { getDatabase, increment, onValue, push, ref, remove, update } from "firebase/database";
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

export async function deleteProduct(productId) {
  remove(ref(db, `products/${productId}`))
}

export async function updateQuantity(productId) {
  const updates = {}
  updates[`products/${productId}/quantity`] = increment(-1)
  return update(ref(getDatabase()),  updates)
}

export async function updateProduct(productId,data) {
  const updates = {}
  updates[`products/${productId}`] = data
  return update(ref(getDatabase()),  updates)
}