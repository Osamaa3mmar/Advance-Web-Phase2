import TopModal from './TopModal';
import style from './style.module.css'
export default function Modal({children,status,onClose,title}) {
  if(!status){
    return <></>
  }
  const closeModal=()=>{
    onClose(false);
  }
  return (
    <div  className={" z-30  fixed top-0 flex items-center justify-center right-0 h-[100%] w-[100%] bg-[#00000033]"}>
      <div className={style.modalAnimation+' outline-2 outline-[white] bg-[#1e1e1e] min-w-[30%] rounded-3xl pb-3 overflow-hidden'}>
      <TopModal onClose={closeModal} title={title}/>
      {children}
      </div>
    </div>
  )
}
