
import style from './style.module.css'
export default function ProgressPar() {


    
  return (
    <div className="bg-[#444444] text-center my-3 relative w-[100%] overflow-hidden  rounded-2xl">
         <p className=" relative z-10">
      50%
      </p>
      <div className={" absolute duration-300 top-0 left-0 h-[100%] w-[50%] bg-[#027bfe] " +style.progressBar }></div>
     
    </div>
  )
}
