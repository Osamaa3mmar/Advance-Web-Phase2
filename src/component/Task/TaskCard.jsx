import Chip from "../Projects/ProjectsArea/Chip";
import style from './style.module.css'
export default function TaskCard() {
  return (
    <div className={style.taskCard+"  border-[#e33421] border-solid border-2  flex flex-col gap-2 bg-[#333333] w-[90%] py-[20px] rounded-md px-[15px]"}>
      <p className=" "><span className=" text-md font-semibold">Task ID:</span> 1 </p>
      <p className=" "><span className=" text-md font-semibold">Description:</span> Create a responsive design for the homepage </p>
      <div className="">
      <p className=" "><span className=" text-md font-semibold">Assigned Student:</span>  </p>
      <div className="chips flex flex-wrap gap-2">
        <Chip/>
        <Chip/>
        <Chip/>
        <Chip/>
        <Chip/>
        <Chip/>
      </div>
      </div>
      <p className=" "><span className=" text-md font-semibold">Status:</span> <span>In Progress</span> </p>

    </div>
  )
}
