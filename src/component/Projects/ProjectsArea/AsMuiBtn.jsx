
export default function AsMuiBtn({text,variant,openSide}) {
    const variants={
        delete:{
            style:' bg-[rgba(255,0,0,0.6)] hover:bg-[red]'
        },
        view:{
            style:' bg-[rgba(3,125,255,0.2)] hover:bg-[#027bfe]'
        },
    }
  return (
<button onClick={()=>{openSide(2)}} className={" py-[10px] cursor-pointer duration-300 rounded-lg  flex-1 "+variants[variant].style}>
{text}
</button>
  )
}
