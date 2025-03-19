
export default function Button({text,type,onClick}) {
  let style='';
  if(type=='primary'){
  }
  
  return (
    <>
    <button onClick={onClick} className=" py-2 px-3 rounded-xl border-solid border-2 border-[#027bff] cursor-pointer duration-400 font-semibold text-[#f5f5f5]  bg-[#027bff22]  hover:bg-[#027bff77]  hover:outline-[3px] hover:outline-[#027bff22]">
      {text}
    </button>
    </>)
}
