import TopModal from './TopModal';
export default function Modal({children,status,onClose,title}) {
  if(!status){
    return <></>
  }
  const closeModal=()=>{
    onClose(false);
  }
  return (
    <div  className="  absolute top-0 flex items-center justify-center right-0 h-[100%] w-[100%] bg-[#00000022]">
      <div className=' outline-2 outline-[white] bg-[#1e1e1e] min-w-[30%] rounded-3xl pb-3 overflow-hidden'>
      <TopModal onClose={closeModal} title={title}/>
      {children}
      </div>
    </div>
  )
}
