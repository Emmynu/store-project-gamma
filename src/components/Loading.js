import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


const Loading = () => {
  return (
    <div>
      <Skeleton width={300} height={150} baseColor="skyblue" highlightColor="lightgray"/>
    </div>
  )
}


export default Loading
  