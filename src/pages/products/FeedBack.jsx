import { useEffect, useRef, useState } from "react"
import { createFeedBack, getFeedBacks, getLikeFeedBack, likeFeedBack, removeLike } from "../../actions/products/feedback";
import { useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/database";
import { auth, storage } from "../../firebase-config";
import { toast } from "sonner";
import { ref as bucketRef, getDownloadURL, uploadBytes} from "firebase/storage";


const FeedBack = () => {
  const [text, setText] = useState("")
  const [feedBacks, setFeedBacks] = useState([])
  const  { id } =  useParams()
  const feedbackRef = useRef(null)


  useEffect(()=>{
    getFeedBacks(id, setFeedBacks)
  },[])

  function addFeedBack(){
    // console.log(text,id);
    createFeedBack(id,{
      createdAt:serverTimestamp(),
      ratings: 5,
      feed:text,
      addedBy:{
        id:auth?.currentUser?.uid,
        url:auth?.currentUser?.photoURL,
        name: auth?.currentUser?.displayName
      }
    })
  }

  async function handleUpload(e){
    const file = e.target.files[0]
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
          })
        } catch (error) {
          toast.error(error.message)
        }
      }else{
      toast.error("Invalid File Format")
    }
  }
}


  return (
    <div>
      <section>
        {feedBacks.length > 0 ? 
          feedBacks.map(feed => {
            return <div>
              {feed[1]?.feed && <h2>{feed[1]?.feed}</h2>}
              {feed[1]?.url && <img src={feed[1]?.url} alt={feed[0]}/>}
              <LikeFeedBack feedId={feed[0]} productId={id}/>
            </div>
          })
        : ""}
      </section>
      {/* modal */}
      <section>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
        <button onClick={addFeedBack}>Submit</button>
        <input type="file" name="" id="" hidden ref={feedbackRef} onChange={handleUpload} multiple={false} accept="image/"/>
        <button onClick={()=>feedbackRef.current.click()}>Upload</button>
      </section>
    </div>
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

  return <button onClick={() => likeFeedback()}>{IsLiked ? "Unlike": "Like"}</button>
}

export default FeedBack
