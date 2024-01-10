import ChatMembers from "../../components/ChatMembers"
import chatImage from "../../images/chats.gif"

const Chats = () => {
  return (
    <main className="bg-white shadow-md w-[98%] lg:w-9/12 pb-7 grid grid-cols-1 lg:grid-cols-5  border m-[5%_auto_0]">
      <section className="col-span-2  overflow-y-scroll">
        <ChatMembers />
      </section>
      <section className="col-span-3 select-none cursor-pointer flex justify-center border-l text-center items-center flex-col">
       <img src={chatImage} alt="chat"/>
       <h4 className="text-slate-800 tracking-wide ">Select a chat to view conversation</h4>
      </section>

    </main>
  )
}

export default Chats
