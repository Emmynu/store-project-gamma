import { getDatabase, onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase-config";

export function saveChatMembers(chatId,data) {
  const updates = {}
  updates[`chats/${chatId}/members`] = data
  update(ref(getDatabase()), updates)
}

export async function getAllChats(chats) {
  onValue(ref(db, `chats/`), result =>{
    result.exists() ? chats(Object.entries(result.val())): result([])
  })
}

export async function getSingleChat(id, chats){
  onValue(ref(db, `chats/${id}/messages`), result =>{
    result.exists() ? chats(Object.entries(result.val())): chats([])
  })
}

export async function saveChat(chatId,data) {
    push(ref(db, `chats/${chatId}/messages`), data)
}
