import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


const Loading = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 items-center">
        <div className="flex justify-center items-center flex-col">
          <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1 w-[350px] h-[220px] md:h-[200px] md:w-[350px]" borderRadius={`5px`}/></span>
          <span><Skeleton  width={200} highlightColor="#f6f6f6 " duration={1}/></span>
          <span> <Skeleton width={100}  highlightColor="#f6f6f6 " duration={1}/></span>
        </div>
        <div className=" justify-center items-center flex-col hidden md:flex ">
          <span > <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1 w-[350px] h-[220px] md:h-[200px] md:w-[350px]" borderRadius={`5px`}/></span>
          <span ><Skeleton  width={200} highlightColor="#f6f6f6 " duration={1}/></span>
          <span><Skeleton width={100}  highlightColor="#f6f6f6 " duration={1}/></span>
        </div>
        <div className=" justify-center items-center flex-col  hidden lg:flex">
          <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1 w-[350px] h-[220px] md:h-[200px] md:w-[350px]" borderRadius={`5px`}/></span>
          <span><Skeleton  width={200} highlightColor="#f6f6f6 " duration={1}/></span>
          <span> <Skeleton width={100}  highlightColor="#f6f6f6 " duration={1}/></span>
        </div>
    </main>
  )
}

export const SearchLoading = () => {
  return(
    <main className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:grid-cols-4 max-w-[72rem] py-7 md:py-4 lg:py-12 mx-3 md:mx-auto md:px-3">
      <div className="hidden md:block col-span-1">
        {/* <Skeleton /> */}
      </div>
      <div className="col-span-3">
          <nav className="mb-4 block md:flex justify-between gap-12">
            <div className="flex-1 my-1.5">
              <Skeleton className="w-[90%] md:w-[200px] h-[20px]"/>
            </div>
            <div className="flex-1">
              <Skeleton className="w-[200px] md:w-full h-[20px]"/>
            </div>
          </nav>
          <main className="grid-view">
            <div>  
              <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1  w-full h-[250px]" borderRadius={`5px`}/></span>
              <span><Skeleton  width={150} highlightColor="#f6f6f6 " duration={1}/></span>
              <span> <Skeleton width={70}  highlightColor="#f6f6f6 " duration={1}/></span>
            </div>

            <div>  
              <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1  w-full h-[250px]" borderRadius={`5px`}/></span>
              <span><Skeleton  width={150} highlightColor="#f6f6f6 " duration={1}/></span>
              <span> <Skeleton width={70}  highlightColor="#f6f6f6 " duration={1}/></span>
            </div>

            <div>  
              <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1  w-full h-[250px]" borderRadius={`5px`}/></span>
              <span><Skeleton  width={150} highlightColor="#f6f6f6 " duration={1}/></span>
              <span> <Skeleton width={70}  highlightColor="#f6f6f6 " duration={1}/></span>
            </div>

            <div>  
              <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1  w-full h-[250px]" borderRadius={`5px`}/></span>
              <span><Skeleton  width={150} highlightColor="#f6f6f6 " duration={1}/></span>
              <span> <Skeleton width={70}  highlightColor="#f6f6f6 " duration={1}/></span>
            </div>

            <div>  
              <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1  w-full h-[250px]" borderRadius={`5px`}/></span>
              <span><Skeleton  width={150} highlightColor="#f6f6f6 " duration={1}/></span>
              <span> <Skeleton width={70}  highlightColor="#f6f6f6 " duration={1}/></span>
            </div>

            <div>  
              <span> <Skeleton highlightColor="#f6f6f6 " duration={1} className="my-1  w-full h-[250px]" borderRadius={`5px`}/></span>
              <span><Skeleton  width={150} highlightColor="#f6f6f6 " duration={1}/></span>
              <span> <Skeleton width={70}  highlightColor="#f6f6f6 " duration={1}/></span>
            </div>
          </main>
      </div>
    </main>
  )
}

export function LoadProfile(){
  return (
    <section><Skeleton height={30} highlightColor="#f6f6f6 " duration={1}/></section>
  )
}


export function LoadAllChatMembers(){
  return <h2>Loading...</h2>
}

export default Loading
  