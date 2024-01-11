import ChatMembers from "../../components/ChatMembers"
import chatImage from "../../images/chats.gif"

const Chats = () => {
  return (
    <main className="grid grid-cols-3 lg:grid-cols-4 h-[100vh]">
      <section className=" col-span-3 md:col-span-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-400">
        <ChatMembers />
      </section>
      <section className="bg-slate-100 hidden  w-full h-full col-span-3 md:col-span-2 lg:col-span-3 md:flex flex-col items-center justify-center">
       <img src={chatImage} alt="chat"/>
       <h4 className="text-slate-800 tracking-wide ">Select a chat to view conversation</h4>
      </section>

    </main>
  )
}

export default Chats
