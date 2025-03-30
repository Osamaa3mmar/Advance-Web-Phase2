import TaskCard from "../../Task/TaskCard";
import Chip from "../ProjectsArea/Chip";
import style from '../ProjectsArea/style.module.css';

export default function SideContent({id}) {
  console.log(id)
  return (
    <div className="text-white  h-[100%]  ">
      <h2 className=" text-[#00bcd4] font-bold text-xl text-center mt-[10px]">Mobile App Development</h2>
      <div className="line w-[95%] m-auto h-[2px] bg-[#363636] rounded-3xl my-[10px]" ></div>
        <p className=" py-1 "><span className="font-bold text-lg">Description:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptates.</p>
              <p className=" py-1"><span className="font-bold text-lg">Students:</span></p >
              <div className=" mt-2 gap-2 flex flex-wrap items-center ">
              <Chip/>
              <Chip/>
              <Chip/>
              </div>
              <p className=" py-1"><span className="font-bold text-lg">Category:</span> </p>
              <div className=" mt-2 gap-2 flex flex-wrap items-center ">
              <Chip/>
              <Chip/>
              <Chip/>
              </div>
              <div className="date my-6 flex items-center justify-between">
                  <p style={{cursor:"pointer"}} data-tooltip-id="start" data-tooltip-offset={5} className={" bg-[rgba(0,255,0,0.2)] px-[10px] py-[4px] rounded-2xl "+ style.startDate }>2023-01-01</p>
                  <p style={{cursor:"pointer"}} data-tooltip-id="end" data-tooltip-offset={5} className={" bg-[rgba(255,0,0,0.2)] px-[10px] py-[4px] rounded-2xl "+style.deadLineDate }>2023-01-01</p>
              </div>
      <div className="line w-[95%] m-auto h-[2px] bg-[#363636] rounded-3xl my-[10px]" ></div>
        <div className=" flex items-center gap-3 flex-col">
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
        </div>
    </div>
  )
}
