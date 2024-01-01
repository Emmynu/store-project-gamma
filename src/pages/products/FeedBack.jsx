import { useEffect, useRef, useState } from "react"
import { createFeedBack, getFeedBacks, getLikeFeedBack, likeFeedBack, removeFeedBack, removeLike } from "../../actions/products/feedback";
import { useParams, Link } from "react-router-dom";
import { serverTimestamp } from "firebase/database";
import { auth, storage } from "../../firebase-config";
import { toast } from "sonner";
import { ref as bucketRef, getDownloadURL, uploadBytes} from "firebase/storage";
import Moment from "react-moment";
import empty from "../../images/fly.gif"


const FeedBack = () => {
  const [text, setText] = useState("")
  const [isUploading, setIsUploading] = useState("")
  const [showField, setShowField] = useState(false)
  const [feedBacks, setFeedBacks] = useState([])
  const  { id, category, brand } =  useParams()
  const feedbackRef = useRef(null)


  useEffect(()=>{
    getFeedBacks(id, setFeedBacks)
  },[])

  function addFeedBack(){
    // console.log(text,id);
    if(text.length > 0){
      createFeedBack(id,{
        createdAt:serverTimestamp(),
        ratings: 5,
        feed:text,
        addedBy:{
          id:auth?.currentUser?.uid,
          url:auth?.currentUser?.photoURL,
          name: auth?.currentUser?.displayName
        }
      }).then(setText(""))
    }
  }

  async function handleUpload(e){
    const file = e.target.files[0]
    setIsUploading(true)
    if(file){
      if (file.type.startsWith("image/")) {
        try {
          const storageRef = bucketRef(storage, `feedbacks/${auth?.currentUser?.uid}/${file.name}`)
          await uploadBytes(storageRef,file)
          const url = await getDownloadURL(storageRef)
          createFeedBack(id,{
            createdAt:serverTimestamp(),
            ratings: 5,
            url,
            addedBy:{
              id:auth?.currentUser?.uid,
              url:auth?.currentUser?.photoURL,
              name: auth?.currentUser?.displayName
            }
          }).then(res=>{
            toast.success("FeedBack Added")
            setIsUploading(false)
          })
        } catch (error) {
          toast.error(error.message)
          setIsUploading(false)
        }
      }else{
      toast.error("Invalid File Format")
      setIsUploading(false)
    }
  }
}


  return (
    <main>
      <header className="bg-blue-100 p-5 w-full px-5">
          <span className="text-sm tracking-wide text-slate-600 ml-1"><Link to={"/"}>Home &gt; </Link></span >
          <span className="text-sm tracking-wide text-slate-600 ml-1"><Link to={"/"}>Products &gt; </Link></span >
          {/* <span className="text-sm tracking-wide text-slate-600 ml-1">{id} &gt;</span > */}
          <span className="text-sm tracking-wide text-slate-600 ml-1">{category} &gt;</span >
          <span className="text-sm tracking-wide text-slate-600 ml-1">{brand} &gt;</span>
          <span className="text-sm tracking-wide text-slate-600 ml-1">feedback </span>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-6xl mt-6 sm:mt-12 mx-2 sm:mx-auto ">
      <section className=" col-span-2 ">
        <main className="bg-white shadow-lg shadow-slate-300  p-5 border  rounded-[4px]">
          <header className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-medium">FeedBacks<sub>({feedBacks.length})</sub></h3>
            {/* <button className="bg-blue-100 font-medium tracking-wide text-blue-700 px-5 py-1.5 rounded-[4px]">Add FeedBack</button> */}
          </header>
          <hr className="mb-2 mt-3"/>
          <article className="mt-6">
            {feedBacks.length > 0 ? 
              feedBacks.map(feed => {
                return <div className="my-1.5 max-w-lg">
                  <article className="bg-blue-100 rounded-[4px] p-4">
                    <div className="flex items-center ">
                      <img src={feed[1]?.addedBy?.url} alt="" className="w-[30px] h-[30px] object-cover rounded-[50%]"/>
                      <h4 className="sm:text-lg ml-4 font-medium">{feed[1]?.addedBy?.name}</h4>
                    </div>
                    {feed[1]?.feed && <h2 className="mt-2 text-sm text-slate-600 ">{feed[1]?.feed}</h2>}
                    {feed[1]?.url && <img src={feed[1]?.url} alt={feed[0]} className="mt-2 rounded-[4px]  h-[200px] object-cover "/>}
                  </article>
                  <footer className="flex items-center mt-1 mb-3">
                    <Moment fromNow className="font-medium text-sm">{feed[1]?.createdAt}</Moment>
                    <LikeFeedBack feedId={feed[0]} productId={id} />
                    {feed[1]?.addedBy?.id === auth?.currentUser?.uid && <button className="font-medium tracking-wide text-red-700 hover:bg-red-100 px-3 py-1 rounded-[4px] text-sm ml-1" onClick={()=>removeFeedBack(id, feed[0])}>remove</button>}
                  </footer>
                </div>
              })
            : 
            <section className="flex flex-col items-center justify-center text-center">
              <img src={empty} className="w-[300px]" alt="empty collection"/>
              <h2 className="font-medium text-slate-800 -mt-1.5 text-center"
              >Currently No FeedBack Found!</h2>
              <h4 className="my-2 text-xs tracking-wider md:text-sm">Unfortunately! This product has not been rated by anyone. Rate it now!</h4>
              <button className="bg-blue-700 px-5 py-1.5 rounded-[4px] text-white tracking-wider text-sm my-1.5" onClick={()=>setShowField(!showField)}> Add FeedBack</button>
            </section>

            }
          </article>
        </main>
          {/* modal */}
          {(feedBacks.length >= 1 || showField) && <section className="mt-2 flex flex-col sm:flex-row items-center  p-5 rounded-[4px]  bg-white shadow-lg shadow-slate-300">
            <input type="text" value={text} placeholder="Feedback..." onChange={(e)=>setText(e.target.value)} className="border border-slate-600 p-2 text-slate-600 tracking-wider text-sm w-full md:w-[75%]" />
            <div className="flex items-center my-2">
              <button onClick={addFeedBack} className="px-7 py-1.5 text-white tracking-wider rounded-[4px] ml-3 bg-blue-700">Submit</button>
              <input type="file" name="" id="" hidden ref={feedbackRef} onChange={handleUpload} multiple={false} accept="image/"/>
              <button onClick={()=>feedbackRef.current.click()} className="px-7 py-1.5 text-blue-700 font-bold tracking-wider rounded-[4px] ml-3 bg-blue-200">{isUploading ? "Loading..." :"Upload"}</button>
            </div>
          </section>}
      </section>
      </div>
     
    </main>
  )
}


function  LikeFeedBack({ feedId,productId }) {
  const [likes, setLikes] = useState([])
  const [IsLiked, setIsLiked] = useState(false)

  useEffect(()=>{
    getLikeFeedBack(productId, feedId, setLikes)
  },[])

  useEffect(()=>{
    likes.map(like =>{
      if (like[1]?.id === auth?.currentUser?.uid) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    })
  },[likes])


  function likeFeedback() {
    if(IsLiked){
      likes.map(like => {
        if(like[1]?.id === auth?.currentUser?.uid){
          removeLike(productId, feedId, like[0])
          setIsLiked(false)
        }
      })
    }
    else{
      likeFeedBack(productId, feedId, {
        id:auth?.currentUser?.uid,
        name:auth?.currentUser?.displayName
      })
    }
  }

  return <div className="ml-4">
     <button onClick={() => likeFeedback()} className="font-medium tracking-wide text-sm hover:text-blue-700 transition-all">{IsLiked ? <span className="text-slate-700">Unlike</span>: <span className="text-blue-700">Like</span>}</button>
     
  </div>
}

export default FeedBack
