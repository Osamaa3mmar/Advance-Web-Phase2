
export default function AsMuiBtn({text,variant,openSide,type}) {
    const variants={
        delete:{
            style:' bg-[rgba(255,0,0,0.6)] hover:bg-[red]'
        },
        view:{
            style:' bg-[rgba(3,125,255,0.4)] hover:bg-[#027bfe]'
        },
        normal:{
          style: ' text-[#027bfe] hover:bg-[rgba(3,125,255,0.2)]'
        }
    }
    const Action=()=>{

      openSide(2)
    }
  return (
<button type={type?type:'button'} onClick={Action} className={"  py-[10px] cursor-pointer duration-300 rounded-lg  flex-1 "+variants[variant].style}>
{text}
</button>
  )
}
