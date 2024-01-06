import { getDatabase, onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase-config";
import { id } from "../auth/auth";

export async function createOrder(data) {
  const orderId = new Date().getTime().toString()
  const updates = {}
  updates[`orders/${id}/${orderId}`] = data
  update(ref(getDatabase()), updates)
}


export async function getAllVendors(vendors){
  onValue(ref(db, "vendors/"),res=>{
    res.exists() ? vendors(Object.keys(res.val())) : vendors([])
  })
}

export async function getOrders(orders) {
  onValue(ref(db, `orders/${id}`),res=>{
    res.exists() ? orders(Object.entries(res.val())) : orders([])
  })
}

export async function getAllOrders(orders) {
  onValue(ref(db, `orders/`),res=>{
    res.exists() ? orders(Object.entries(res.val())) : orders([])
  })
}

export async function getVendorOrders(orders) {
  onValue(ref(db, `vendors/${id}/orders`),res=>{
    res.exists()? orders(Object.entries(res.val())) : orders([])
  })
}
