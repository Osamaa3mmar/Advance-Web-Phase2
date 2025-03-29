
export default function Button({text,type,onClick}) {
  
  return (
    <>
    <button onClick={onClick} className=" lg:w-[200px] py-2 px-3 rounded-xl border-2 border-[#027bff] cursor-pointer duration-400 font-semibold text-[#f5f5f5] bg-[#027bff22] hover:bg-[#027bff77] hover:outline-[3px] hover:outline-[#027bff22] 
  sm:w-full w-full">
      {text}
    </button>
    </>)
}
