import AsMuiBtn from "./AsMuiBtn";
import Chip from "./Chip";
import ProgressPar from "./ProgressPar";
import style from './style.module.css';
import { Tooltip } from 'react-tooltip'


export default function ProjectCard({openSide}) {

  return (
    <div  className={style.projectCard +" hover:scale-[1.02] duration-300 text-white bg-[#333333]"}>
        <h3 className=" text-[#027bfe] font-bold text-2xl pb-2">Website Redesign </h3>
        <div className="my-2 line bg-[#9c9c9c] w-[100%] h-[2px] rounded-3xl"></div>
        <p className=" py-1 "><span className="font-bold text-lg">Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptates.</p>
        <p className=" py-1"><span className="font-bold text-lg">Students:</span></p >
        <div className=" mt-2 gap-2 flex flex-wrap items-center ">
        <Chip/>
        
        </div>
        
        <p className=" py-1"><span className="font-bold text-lg">Category:</span> </p>
        <div className=" mt-2 gap-2 flex flex-wrap items-center ">
        <Chip/>
       
        </div>

        <ProgressPar/>
        <div className="date my-3 flex items-center justify-between">
            <p style={{cursor:"pointer"}} data-tooltip-id="start" data-tooltip-offset={5} className={" bg-[rgba(0,255,0,0.2)] px-[10px] py-[4px] rounded-2xl "+ style.startDate }>2023-01-01</p>
            <p style={{cursor:"pointer"}} data-tooltip-id="end" data-tooltip-offset={5} className={" bg-[rgba(255,0,0,0.2)] px-[10px] py-[4px] rounded-2xl "+style.deadLineDate }>2023-01-01</p>
        </div>
        <div className="my-2 line bg-[#9c9c9c] w-[100%] h-[2px] rounded-3xl"></div>

        <div className="flex gap-8 items-center justify-between">
            <AsMuiBtn openSide={openSide} text={"View"} variant={"view"}/>
            <AsMuiBtn text={"Delete"} variant={'delete'}/>
        </div>
        <Tooltip  id="start" content="Start Date !" key={"right"} place="right"  />
        <Tooltip  id="end" content="End Date !" key={"left"} place="left"  />
    </div>
  )
}
