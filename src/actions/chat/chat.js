import { getDatabase, onValue, push, ref, remove, update } from "firebase/database";
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

export async function getSingleChat(id, chats, loading){
  loading(true)
  onValue(ref(db, `chats/${id}/messages`), result =>{
    result.exists() ? chats(Object.entries(result.val())): chats([])
    loading(false)
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

export async function deleteRoom(id) {
  remove(ref(db, `chats/${id}`)).then(window.location = "/chats")
}

export async function removeMessage(id, mid) {
  remove(ref(db, `chats/${id}/messages/${mid}`))
}


export async function addFavorite(id, data) {
 const updates = {}
 updates[`chats/${id}/favourite`] = data
 update(ref(getDatabase()), updates)
}

export async function getFavourite(chatId, fav) {
  onValue(ref(db, `chats/${chatId}/favourite`), res =>{
    res.exists() ? fav(res.val()) : fav(false)
  })
}