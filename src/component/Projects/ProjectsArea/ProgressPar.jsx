
import style from './style.module.css'
export default function ProgressPar({value}) {

console.log(value);
    
  return (
    <div className="bg-[#444444] text-center my-3 relative w-[100%] overflow-hidden  rounded-2xl">
         <p className=" relative z-10">
      {value}%
      </p>
      <div style={{width: `${value}%`}} className={`absolute duration-300 top-0 left-0 h-[100%] w-[${value}%]  bg-[#027bfe] ` +style.progressBar }></div>
     
    </div>
  )
}
