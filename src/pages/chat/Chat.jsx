import { useParams, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { deleteRoom, getSingleChat, getSingleChatMembers, removeMessage, saveChat } from "../../actions/chat/chat"
import { auth, storage } from "../../firebase-config"
import ChatMembers from "../../components/ChatMembers"
import  "../../components/chat.css"
import { id } from "../../actions/auth/auth"
import { serverTimestamp } from "firebase/database"
import Moment from "react-moment"
import deleteIcon from "../../images/delete.png"
import sendIcon from "../../images/send.png"
import loadIcon from "../../images/load.png"
import uploadIcon from "../../images/upload.png"
import { Toaster, toast } from "sonner"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const Chat = () => { 
  const [chats, setChats] = useState([])
  const scrollMessage = useRef()
  const uploadRef = useRef()
  const [members, setMembers] = useState([])
  const [text, setText] = useState("")
  const { chatId, userId } = useParams()
  const [isUploading, setIsUploading] = useState(false)

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
      <section className="col-span-1 hidden md:block overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400">
        <ChatMembers />
      </section>
      <section className="col-span-3 md:col-span-2 lg:col-span-3 bg-slate-100 relative">
        <header className="chat-header">
        <div className="flex items-center">
          <h2 className="mr-3">
              <Link to={-1}>
              <img width="21" height="21" src="https://img.icons8.com/ios-glyphs/30/back.png" alt="back" />
              </Link>
            </h2>
          <section>
          {members?.receiver?.id === id ? 
              <article className="flex items-center">
                <img className="w-[35px] h-[35px] object-cover rounded-[50%]" src={members?.sender?.url} alt={`${members?.sender?.name} avatar`}/>
                <h3 className="ml-2 font-medium text-[18px] text-slate-700">{members?.sender?.name}</h3>
              </article>
            : 
            <article className="flex items-center">
            <img className="w-[35px] h-[35px] object-cover rounded-[50%]" src={members?.receiver?.url} alt={`${members?.receiver?.name} avatar`}/>
            <h3 className="ml-2 font-medium text-[18px] text-slate-700">{members?.receiver?.name}</h3>
          </article>
          }
          </section>
        </div>
        <button onClick={()=>deleteRoom(chatId)}><img src={deleteIcon} alt="delete-icon" className="w-5"/></button>
        </header>

        <article className="overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400  h-[70vh] mb-10 md:mb-20">
          {chats.map(chat=>{
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
          })}
        </article>
   


        <footer className="absolute bottom-4 right-0 left-0 flex justify-around mx-2 md:mx-20">

          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder=" Type your message..." className="bg-white text-sm tracking-wide text-slate-700 px-2 rounded-md w-full py-2.5 outline-none shadow-md "/>
          
          <button onClick={sendMessage} className="ml-2 bg-blue-700 px-5 py-1 rounded-[4px] text-white font-medium"><img src={sendIcon} alt="send" className="w-6 md:w-7" /></button>

          <button className="ml-2 bg-blue-700 px-5 py-1 flex justify-center items-center rounded-[4px] text-white font-medium" onClick={()=>uploadRef.current.click()}>{ isUploading ? <img src={loadIcon} className="w-5 animate-spin"/> : <img src={uploadIcon} className="w-9 md:w-7"/>}</button>
          <input type="file" name="" ref={uploadRef} hidden multiple={false} accept="image/" id="" onChange={handleFileUpload}/>

        </footer>
      </section>

    </main>
    <Toaster richColors position="top-right" closeButton className="z-40"/>
   </>

  )
}




export default Chat

