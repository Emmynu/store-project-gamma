import { useEffect, useState } from "react"
import { id } from "../actions/auth/auth"
import { Link } from "react-router-dom"
import { getAllChats } from "../actions/chat/chat"
import "./chat.css"
import { LoadAllChatMembers } from "./Loading"
import notFound from "../images/not-found.gif"

const ChatMembers = () => {
  const [chats, setChats] = useState([])
  const [filteredChats, setFilteredChats] = useState([])
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  useEffect(()=>{
    getAllChats(setChats, setIsLoading)
  },[])

  const newChats = chats.filter(chat=> chat[1]?.members?.sender?.id === id || chat[1]?.members?.receiver?.id === id)
  
  function handleSearch() {
    setFilteredChats(text.length > 0 ? (newChats.filter(chat=>chat[1]?.members?.sender?.name.toLowerCase().includes(text.toLowerCase()) ||  chat[1]?.members?.receiver?.name.toLowerCase().includes(text.toLowerCase()))) : newChats)
  }
  return (
    <main className="p-4">
      <header >
        <section className="flex items-center justify-between">
          <h2 className="chat-title">Chats</h2>
          <h4 className="text-xs text-blue-700 tracking-wide  hover:underline cursor-pointer"><Link to={"/"}>&larr; Back Home</Link></h4>
        </section>
        <section >
          <input type="text" className="w-full px-3 py-2 mt-1.5 tracking-wide rounded-sm outline-none bg-slate-100 text-sm text-slate-600 font-medium" placeholder="Search here..." value={text} onChange={(e)=>setText(e.target.value)} onKeyUp={handleSearch}/>
        </section>
      </header>
      <section className=" mt-12 md:mt-8">
        <header>
          <h3 className="uppercase my-5 text-slate-600 font-medium tracking-wide text-sm">DIRECT MESSAGES</h3>
        </header>
      {!isLoading ?
      <>{(newChats.length>0 || filteredChats.length > 0 )? (!text ? newChats : filteredChats).map(chat=>{
        return <section className="my-2.5">
              {chat[1]?.members?.sender?.id === id ?<Link to={`/chat/${chat[0]}/${chat[1]?.members?.receiver?.id}`}>
                <article className="flex items-center my-4">
                  <img className="w-[40px] h-[40px] object-cover rounded-[50%]" src={chat[1]?.members?.receiver?.url}/>
                  <div>
                    <h3 className="ml-1.5 text-[13px] text-slate-700 tracking-wider font-medium">{chat[1]?.members?.receiver?.name}</h3>
                  </div>
                </article>
                <hr />
              </Link>
              
              : <Link to={`/chat/${chat[0]}/${chat[1]?.members?.sender?.id}`}>
                  <article className="flex items-center my-4">
                    <img className="w-[40px] h-[40px] object-cover rounded-[50%]" src={chat[1]?.members?.sender?.url}/>
                   <div>
                    <h3 className="ml-1.5 text-[13px] text-slate-700 tracking-wider font-medium">{chat[1]?.members?.sender?.name}</h3>
                   </div>
                </article>
                <hr />
              </Link>}
        </section>
      }) : <section className=" text-center">
          <div className="flex justify-center">  <img src={notFound} alt="" className="w-[300px]"/></div>
          <h2 className="text-[13px] lg:text-sm text-slate-600 tracking-wider">No Chat history found. Please  initiate a conversation to begin chatting</h2>
        </section>}</>
      : <section><LoadAllChatMembers /></section>} 
      </section>
    </main>
  )
}

export default ChatMembers
