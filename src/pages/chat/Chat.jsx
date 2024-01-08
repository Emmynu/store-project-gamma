import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleChat, saveChat } from "../../actions/chat/chat"
import { auth } from "../../firebase-config"




const Chat = () => { 

  const [chats, setChats] = useState([])
  const [text, setText] = useState("")
  const { chatId } = useParams()

  useEffect(()=>{
    getSingleChat(chatId, setChats)
  },[])

  console.log(chats);

  function sendMessage(e) {
    e.preventDefault()
    saveChat(chatId, {
      id:auth?.currentUser?.uid,
      name:auth?.currentUser?.displayName,
      message: text
    }).then(setText(""))
  }

  return (
    <main>
      <section>
        {chats.map(chat=>{
          return <h3>{chat[1]?.message}</h3>
        })}
      </section>
      <form onSubmit={sendMessage}>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        <button>Send</button>
      </form>
    </main>
  )
}


export default Chat
