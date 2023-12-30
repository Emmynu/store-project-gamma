import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCurrentUser, getSingleUserFromDb } from "../../actions/auth/auth"


const Chat = () => { 
  const { id } = useParams()
  const [receiver, setReceiver] = useState([])
  const [sender, setSender] = useState([])
  const [text, setText] =  useState("")

  useEffect(()=>{
    getSingleUserFromDb(id,setReceiver)
    getCurrentUser(setSender)
  },[])

  function sendMessage(e) {
    e.preventDefault()
    console.log("message sent");
  }

  return (
    <main>
      <form onSubmit={sendMessage}>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        <button>Send</button>
      </form>
    </main>
  )
}

export default Chat
