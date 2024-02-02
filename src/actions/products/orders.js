import { getDatabase, onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase-config";
import { id } from "../auth/auth";

export async function createOrder(orderId,data ) {
  const updates = {}
  updates[`orders/${id}/${orderId}`] = data
  update(ref(getDatabase()), updates)
}


export async function getAllVendors(vendors){
  onValue(ref(db, "vendors/"),res=>{
    res.exists() ? vendors(Object.keys(res.val())) : vendors([])
  })
}

export async function getOrders(orders, isLoading) {
  isLoading(true)
  onValue(ref(db, `orders/${id}`),res=>{
    res.exists() ? orders(Object.entries(res.val())) : orders([])
    isLoading(false)
  }) 
}

export default function getSingleOrder(orders, orderId){
  onValue(ref(db, `orders/${id}/${orderId}`), res =>{
    res.exists() ? orders((res.val())) :  orders([])
  })
}

export async function getAllOrders(orders) {
  onValue(ref(db, `orders/`),res=>{
    res.exists() ? orders(Object.entries(res.val())) : orders([])
  })
}

export async function getVendorOrders(id,orders) {
  onValue(ref(db, `vendors/${id}/orders`),res=>{
    res.exists()? orders(Object.entries(res.val())) : orders([])
  })
}


export async function updateOrders(userId,orderId, status){
  const updates = {}
  updates[`orders/${userId}/${orderId}/status/`] = status
  update(ref(getDatabase()), updates)
}

export async function getUserOrderProduct(userId,orderId, products,isLoading){
  isLoading(true)
  onValue(ref(db, `orders/${userId}/${orderId}/products`),res =>{
    res.exists() ? products(Object.entries(res.val())) : products([])
    isLoading(false)
  })
}



export async function saveVendorOrder(vendorId,orderId, data) {
  const updates = {}
  updates[`vendors/${vendorId}/orders/${orderId}`] = data
  update(ref(getDatabase()), updates)
}


export async function updateVendorOrders(vendorId, orderId, status){
  const updates = {}
  updates[`vendors/${vendorId}/orders/${orderId}/products/status`] = status
  update(ref(getDatabase()), updates)
}

export async function saveRefund(orderId, data) {
  const updates = {}
  updates[`refunds/${orderId}`] = data
  update(ref(getDatabase()), updates)
}


export async function getRefunds(refunds) {
  onValue(ref(db, `refunds/`),res=>{
    res.exists()? refunds(Object.entries(res.val())) : refunds([])
  })
}