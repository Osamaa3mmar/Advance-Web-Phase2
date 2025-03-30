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
      <div className={style.modalAnimation+' outline-6 outline-[#027bff44] bg-[#1e1e1e] min-w-[400px] lg:w-[50%] md:w-[60%] xs:w-[100%] rounded-2xl pb-3 flex flex-col overflow-hidden'}>
      <TopModal onClose={closeModal} title={title}/>
      {children}
      </div>
    </div>
  )
}
