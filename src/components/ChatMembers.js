import { useEffect, useState } from "react"
import { id } from "../actions/auth/auth"
import { Link } from "react-router-dom"
import { getAllChats } from "../actions/chat/chat"


const ChatMembers = () => {
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(()=>{
    getAllChats(setChats, setIsLoading)
  },[])

  const newChats = chats.filter(chat=> chat[1]?.members?.sender?.id === id || chat[1]?.members?.receiver?.id === id)

  return (
    <main>
      <header className=" bg-blue-100">
        <h2 className="text-[22px] leading-[2rem] font-medium  font-[arial] p-2.5 text-blue-700 tracking-wide">All Messages</h2>
      </header>
      <section className="l m-4">
      {newChats.map(chat=>{
        return <section className="border-b border-slate-300 py-3">
              {chat[1]?.members?.sender?.id === id ?<Link to={`/chat/${chat[0]}/${chat[1]?.members?.receiver?.id}`}>
                <article className="flex items-center  ">
                  <img className="w-[40px] h-[40px] object-cover rounded-[50%]" src={chat[1]?.members?.receiver?.url}/>
                  <div>
                    <h3 className="ml-2 text-slate-900 tracking-wider">{chat[1]?.members?.receiver?.name}</h3>
                    <h3 className="ml-2 text-xs my-0.5 text-slate-600 tracking-wider">{chat[1]?.members?.receiver?.id}</h3>
                  </div>
                </article>
              </Link>
              
              : <Link to={`/chat/${chat[0]}/${chat[1]?.members?.sender?.id}`}>
                  <article className="flex items-center  ">
                    <img className="w-[40px] h-[40px] object-cover rounded-[50%]" src={chat[1]?.members?.sender?.url}/>
                   <div>
                    <h3 className="ml-2 text-slate-900 tracking-wider">{chat[1]?.members?.sender?.name}</h3>
                    <h3 className="ml-2 text-xs my-0.5 text-slate-600 tracking-wider">{chat[1]?.members?.sender?.id}</h3>
                   </div>
                </article>
              </Link>}
        </section>
      })} 

      </section>
    </main>
  )
}

export default ChatMembers
