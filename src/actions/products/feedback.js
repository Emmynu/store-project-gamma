import { onValue, push, ref, remove } from "firebase/database";
import { db } from "../../firebase-config";

export async function createFeedBack(productId, data) {
 push(ref(db, `products/${productId}/feedbacks`),data) 
}

export function getFeedBacks(productId, feedbacks) {
  onValue(ref(db ,`products/${productId}/feedbacks`), res =>{
    res.exists() ?  feedbacks(Object.entries(res.val())) : feedbacks([])
  })
}


export async function removeFeedBack(productId, feedbackId) {
  remove(ref(db ,`products/${productId}/feedbacks/${feedbackId}`))
}

export function likeFeedBack(productId, feedbackId, data) {
  push(ref(db, `products/${productId}/feedbacks/${feedbackId}/likes`), data)
}

export function getLikeFeedBack(productId, feedbackId, likes) {
  onValue(ref(db, `products/${productId}/feedbacks/${feedbackId}/likes`), res =>{
    res.exists() ? likes(Object.entries(res.val())) :  likes([])
  })
}

export function removeLike(productId, feedbackId, likeId) { 
  remove(ref(db,`products/${productId}/feedbacks/${feedbackId}/likes/${likeId}`))
}


