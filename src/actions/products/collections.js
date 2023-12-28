import { onValue, push, ref, remove } from "firebase/database";
import { db } from "../../firebase-config";

// save collection to db
export async function saveCollectionDb(uid,data) {
  push(ref(db, `collections/${uid}`), data)
}

export async function getCollection(id, collection) {
  const collectionRef = ref(db, `collections/${id}` )
  onValue(collectionRef, res =>{
    res.val() !== null ?  collection(Object.entries(res.val())) :  collection([])
  })
}

export function removeProductFromCollection(id, productId){
  try {
    remove(ref(db, `collections/${id}/${productId}`))
  } catch (err) {
    console.log(err.message);
  }
}

export function clearAllCollections(id) {
  try {
    remove(ref(db, `collections/${id}/`))
  } catch (error) {
    console.log(error.message);
  }
}