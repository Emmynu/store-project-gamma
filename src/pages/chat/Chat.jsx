import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleChat, getSingleChatMembers, saveChat } from "../../actions/chat/chat"
import { auth } from "../../firebase-config"
import ChatMembers from "../../components/ChatMembers"
import { id } from "../../actions/auth/auth"

const Chat = () => { 
  const [chats, setChats] = useState([])
  const [members, setMembers] = useState([])
  const [text, setText] = useState("")
  const { chatId, userId } = useParams()

  useEffect(()=>{
    getSingleChat(chatId, setChats)
    getSingleChatMembers(chatId, setMembers)
  },[chatId])

  console.log(chats);



  function sendMessage() {
    // e.preventDefault()
   if(text.length > 0){
    saveChat(chatId, {
      id:auth?.currentUser?.uid,
      name:auth?.currentUser?.displayName,
      message: text
    }).then(setText(""))
   }
  }

  return (
    <main className="bg-white relative shadow-md w-[98%] lg:w-9/12  pb-7 grid grid-cols-1 lg:grid-cols-5  border m-[5%_auto_0]">
      <section className="col-span-2 hidden lg:block overflow-y-scroll">
        <ChatMembers />
      </section>
      <section className="border-l col-span-3 relative  ">
        <header className="bg-blue-100 p-3 grid grid-cols-3 items-center">
          <h2>
            <Link to={-1}>
            <img width="21" height="21" src="https://img.icons8.com/ios-glyphs/30/back.png" alt="back"/>
            </Link>
            </h2>
          {members?.receiver?.id === id ? 
            <article className="flex items-center">
              <img className="w-[30px] h-[30px] object-cover rounded-[50%]" src={members?.sender?.url} alt={`${members?.sender?.name} avatar`}/>
              <h3 className="ml-1 font-medium text-[18px] text-slate-700">{members?.sender?.name}</h3>
            </article>
          : 
          <article className="flex items-center">
          <img className="w-[30px] h-[30px] object-cover rounded-[50%]" src={members?.receiver?.url} alt={`${members?.receiver?.name} avatar`}/>
          <h3 className="ml-1 font-medium text-[18px] text-slate-700">{members?.receiver?.name}</h3>
        </article>
        }
        <div></div>
        </header>
        <article className="h-[50vh] overflow-scroll mb-[2rem]">
          {chats.map(chat=>{
            return <main className="m-3 ">
               <h3 className={chat[1]?.id === id ? "bg-blue-700 text-white tracking-wide text-sm p-3 max-w-[20rem] rounded-lg" : "bg-slate-600 text-white tracking-wide text-sm p-3 max-w-[20rem] rounded-lg"}>{chat[1]?.message}</h3>
            </main>
          })}
        </article>

        <footer className="absolute bottom-0 bg-white  left-0 p-2 flex justify-between items-center border right-0">
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="write a message here" className="outline-none text-sm tracking-wider"/>
          <button onClick={sendMessage}>Send</button>
        </footer>
      </section>

    </main>
  )
}




export default Chat

