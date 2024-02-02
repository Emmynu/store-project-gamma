import { useParams } from "react-router-dom"

const TrackOrder = () => {
  const { id } = useParams()
  return (
    <div>
      You are tracking {id} order
    </div>
  )
}

export default TrackOrder
