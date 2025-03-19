import { IoCloseSharp } from "react-icons/io5";

export default function TopModal({onClose,title}) {
  return (
    <div className=" w-[100%] bg-[#027bff] flex items-center justify-between p-3">
      <p className=" text-white font-semibold text-xl">{title}</p>
      <div onClick={onClose} className=" cursor-pointer flex items-center justify-center w-[35px] p-1 h-[35px] rounded-full hover:bg-[#1e1e1e50] "><IoCloseSharp color="white" fontWeight={600} fontSize={30}/>
      </div>
    </div>
  )
}
