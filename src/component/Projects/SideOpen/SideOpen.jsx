import style from './style.module.css'
import { IoClose } from "react-icons/io5";

export default function SideOpen({status,closeSide}) {
  if(!status){
    return <></>
  }

  const handleClose=()=>{
    closeSide(null);
  }
  return (
    <div className={style.sideCont}>
      <div className={style.sideCard}>
      <div onClick={handleClose} className={style.closeBtn}>
          <IoClose className=' text-white' fontSize={40}/>
          </div>
        <div className={style.sideContent}>
          
        SideOpen
        </div>
      
      </div>
    </div>
  )
}
