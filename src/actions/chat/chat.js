import { push, ref } from "firebase/database";
import { db } from "../../firebase-config";

export function saveMessageToDb(senderId) {
  push(ref(db ,`chats/${senderId}/       `))
}