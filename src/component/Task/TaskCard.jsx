import Chip from "../Projects/ProjectsArea/Chip";
import style from './style.module.css'
export default function TaskCard({id,description,student,status}) {
  return (
    <div className={style.taskCard+"  border-[#e33421] border-solid border-2  flex flex-col gap-2 bg-[#333333] w-[90%] py-[20px] rounded-md px-[15px]"}>
      <p className=" "><span className=" text-md font-semibold">Task ID:</span> {id} </p>
      <p className=" "><span className=" text-md font-semibold">Description:</span> {description} </p>
      <div className="">
      <p className=" "><span className=" text-md font-semibold">Assigned Student:</span>  </p>
      <div className="chips flex flex-wrap gap-2">
        <Chip stu={student.id}/>
      </div>
      </div>
      <p className=" "><span className=" text-md font-semibold">Status:</span> <span>{status}</span> </p>

    </div>
  )
}
