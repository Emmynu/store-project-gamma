import { useParams, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { addFavorite, deleteRoom, getFavourite, getSingleChat, getSingleChatMembers, removeMessage, saveChat } from "../../actions/chat/chat"
import { auth, db, storage } from "../../firebase-config"
import ChatMembers from "../../components/ChatMembers"
import  "../../components/chat.css"
import { id } from "../../actions/auth/auth"
import { serverTimestamp } from "firebase/database"
import Moment from "react-moment"
import deleteIcon from "../../images/delete.png"
import sendIcon from "../../images/send.png"
import empty from "../../images/chats.gif"
import loadIcon from "../../images/load.png"
import uploadIcon from "../../images/upload.png"
import { Toaster, toast } from "sonner"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { OrderOptionsLoading } from "../../components/Loading"

const Chat = () => { 
  const [chats, setChats] = useState([])
  const scrollMessage = useRef()
  const uploadRef = useRef()
  const [members, setMembers] = useState([])
  const [text, setText] = useState("")
  const { chatId, userId } = useParams()
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getSingleChat(chatId, setChats, setIsLoading)
    getSingleChatMembers(chatId, setMembers)
  },[chatId])





  if(isLoading){
    return <OrderOptionsLoading />
  }

  function sendMessage() {
    // e.preventDefault()
   if(text.length > 0){
    saveChat(chatId, {
      id:auth?.currentUser?.uid,
      name:auth?.currentUser?.displayName,
      message: text,
      at: serverTimestamp()
    }).then(setText("")).then(res=>{
      scrollMessage.current.scrollIntoView()
    })
   }
  }

 async function handleFileUpload(e) {
    const file = e.target.files[0]
    console.log(file);
    setIsUploading(true)
    if(file){
      if (file.type.startsWith("image/")) {
        const storageRef  = ref(storage, `chats/${auth?.currentUser?.uid}/${file?.name}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        await saveChat(chatId,{
          id:auth?.currentUser?.uid,
          name:auth?.currentUser?.displayName,
          url,
          at: serverTimestamp()
        }).then(setIsUploading(false)).then(scrollMessage.current.scrollIntoView())
      }else{
        toast.error("Invalid File Format")
        setIsUploading(false)
      }
    }
    setIsUploading(false)
  }



  return (
   <>
    <main className="grid grid-cols-3 lg:grid-cols-4 h-[95vh]">
      <section className="col-span-1 hidden md:block overflow-y-scroll scrollbar-thin ">
        <ChatMembers />
      </section>
      <section className="col-span-3 md:col-span-2 lg:col-span-3 bg-slate-100 relative">
        <header className="chat-header">
        <div className="flex items-center">
          <h2 className="mr-3">
              <Link to={"/chats"}>
              <img width="21" height="21" src="https://img.icons8.com/ios-glyphs/30/back.png" alt="back" />
              </Link>
          </h2>
          <section>
          {members?.receiver?.id === id ? 
              <article className="flex items-center">
                <img className="w-[35px] h-[35px] object-cover rounded-[50%]" src={members?.sender?.url} alt={`${members?.sender?.name} avatar`}/>
                <div>
                  <h3 className="ml-2 font-medium text-[18px] text-slate-700">{members?.sender?.name}</h3>
                  <h3 className="text-xs text-blue-600 ml-2 tracking-wider -mt-1">Active user</h3>
                </div>
              </article>
            : 
            <article className="flex items-center">
            <img className="w-[35px] h-[35px] object-cover rounded-[50%]" src={members?.receiver?.url} alt={`${members?.receiver?.name} avatar`}/>
           <div>
             <h3 className="ml-2 mt-1 font-medium text-[18px] text-slate-700">{members?.receiver?.name}</h3>
             <h3 className="text-xs text-blue-600 ml-2 tracking-wider -mt-1">Active user</h3>
           </div>
          </article>
          }
          </section>
        </div>
          <div className="flex items-center">
            <button onClick={()=>deleteRoom(chatId)}><img src={deleteIcon} alt="delete-icon" className="w-5"/></button>
          </div>
        </header>

        <article className="overflow-y-scroll scrollbar-thin   h-[100vh] mb-10 md:mb-20">
          {chats.length > 0 ? chats.map(chat=>{
            return <section ref={scrollMessage}>
            {chat[1]?.id === id ? <main className=" flex flex-col items-end justify-end my-2 mr-3" >
               {chat[1]?.message && <h3 className= "bg-blue-600 text-slate-50 text-sm  max-w-[20rem] lg:max-w-[30rem] tracking-wider  leading-relaxed shadow-sm rounded-md p-4">{chat[1]?.message}</h3>}
               {chat[1]?.url && <section>
                <img src={chat[1]?.url} className="w-[200px] md:w-[300px] h-full object-cover rounded-md"/>
              </section>}
              <footer className="flex items-center">
                <Moment className="text-[10px] text-slate-600 tracking-wide font-medium" fromNow >{chat[1]?.at || "a minute ago"}</Moment>
                <button className="ml-1.5" onClick={()=>removeMessage(chatId, chat[0])}><img src={deleteIcon} alt="delete-icon" className="w-4"/></button>
              </footer>

            </main>: <main className=" flex flex-col items-start justify-start my-2 ml-3" >
             { chat[1]?.message && <h3 className= "bg-slate-50 text-slate-700 p-3 shadow-md text-sm max-w-[20rem] lg:max-w-[30rem]tracking-wider  leading-relaxed  rounded-md px-2 py-1.5 ">{chat[1]?.message}</h3>}
              {chat[1]?.url && <section>
                <img src={chat[1]?.url} className="w-[200px] md:w-[300px] h-full object-cover rounded-md"/>
              </section>}
              <footer className="flex items-center flex-row-reverse mt-1.5">
                <Moment className="text-[10px] text-slate-600 tracking-wide font-medium" fromNow >{chat[1]?.at || "a minute ago"}</Moment>
                <button className="mr-1.5" onClick={()=>removeMessage(chatId, chat[0])}><img src={deleteIcon} alt="delete-icon" className="w-4"/></button>
              </footer>
              </main>}
            
            </section>
          }) :  <section className="flex justify-center h-[70vh] flex-col items-center mx-3 mt-12 md:mt-6">
              <img src={empty} alt="empty" className="w-8/12 md:w-fit" />
              <h4 className="text-sm text-slate-600 tracking-wider text-center">Oops! it seems like there's no chat history. Start a conversation and get things rolling</h4>
            </section>}
        </article>
   


        <footer className="absolute -bottom-4 md:bottom-0 border-t  bg-white p-2 right-0 left-0  flex items-center">

          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder=" Type your message..." className="bg-transparent text-sm tracking-wider  outline-none w-full"/>
          
          <button onClick={sendMessage} className="bg-gray-700 px-2 py-1.5 rounded-md"><img src={sendIcon} alt="send" className="w-5" /></button>

          <button className="ml-2 bg-blue-700 px-3 py-1.5  flex justify-center items-center rounded-md text-white font-medium" onClick={()=>uploadRef.current.click()}>{ isUploading ? <img src={loadIcon} className="w-5 animate-spin"/> : <img src={uploadIcon} className="w-6 md:w-6"/>}</button>
          <input type="file" name="" ref={uploadRef} hidden multiple={false} accept="image/" id="" onChange={handleFileUpload}/>

        </footer>
      </section>

    </main>
    <Toaster richColors position="top-right" closeButton className="z-40"/>
   </>

  )
}




export default Chat

