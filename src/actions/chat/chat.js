import { getDatabase, onValue, push, ref, update } from "firebase/database";
import { db } from "../../firebase-config";

export async function saveChatMembers(chatId,data) {
  const updates = {}
  updates[`chats/${chatId}/members`] = data
  update(ref(getDatabase()), updates)
}

export async function getAllChats(chats, isLoading) {
  isLoading(true)
  onValue(ref(db, `chats/`), result =>{
    result.exists()  ? chats(Object.entries(result.val())): chats([])
    isLoading(false)
  })
}

export async function getSingleChat(id, chats){
  onValue(ref(db, `chats/${id}/messages`), result =>{
    result.exists() ? chats(Object.entries(result.val())): chats([])
  })
}

export async function getSingleChatMembers(id, chats){
  onValue(ref(db, `chats/${id}/members`), result =>{
    result.exists() ? chats((result.val())): chats([])
  })
}

export async function saveChat(chatId,data) {
    push(ref(db, `chats/${chatId}/messages`), data)
}
