import { useEffect, useState } from "react"
import { getAllChats } from "../../actions/chat/chat"
import { id } from "../../actions/auth/auth"
import { Link } from "react-router-dom"

const Chats = () => {
  const [chats, setChats] = useState([])

  useEffect(()=>{
    getAllChats(setChats)
  },[])

  
  const newChats = chats.filter(chat=> chat[1]?.members?.sender?.id === id || chat[1]?.members?.receiver?.id === id)
  console.log(newChats);

  return (
    <main>
      {newChats.map(chat=>{
        return <section>
              {chat[1]?.members?.sender?.id === id ?<Link to={`/chat/${chat[0]}/${chat[1]?.members?.receiver?.id}`}>
                <article>
                  <img src={chat[1]?.members?.receiver?.url}/>
                  <h3>{chat[1]?.members?.receiver?.name}</h3>
                </article>
              </Link>
              
              : <Link to={`/chat/${chat[0]}/${chat[1]?.members?.sender?.id}`}>
                  <article>
                    <img src={chat[1]?.members?.sender?.id}/>
                    <h3>{chat[1]?.members?.sender?.name}</h3>
                </article>
              </Link>}
        </section>
      })}
    </main>
  )
}

export default Chats
