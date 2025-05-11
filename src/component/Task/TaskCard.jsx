import Chip from "../Projects/ProjectsArea/Chip";
import style from './style.module.css'
export default function TaskCard({id, name, description, status, user, dueDate}) {
  return (
    <div className={style.taskCard+"  border-[#e33421] border-solid border-2  flex flex-col gap-2 bg-[#333333] w-[90%] py-[20px] rounded-md px-[15px]"}>
      <p className=" "><span className=" text-md font-semibold">Task Name:</span> {name} </p>
      <p className=" "><span className=" text-md font-semibold">Task ID:</span> {id} </p>
      <p className=" "><span className=" text-md font-semibold">Description:</span> {description} </p>
      <div className="">
      <p className=" "><span className=" text-md font-semibold">Assigned User:</span>  </p>
      <div className="chips flex flex-wrap gap-2">
        {user ? <Chip stu={user} /> : <span className="text-gray-400">No user assigned</span>}
      </div>
      </div>
      <p className=" "><span className=" text-md font-semibold">Status:</span> <span className={status === "completed" ? "text-green-400" : status === "pending" ? "text-yellow-400" : "text-blue-400"}>{status}</span> </p>
      {dueDate && <p className=" "><span className=" text-md font-semibold">Due Date:</span> <span>{new Date(parseInt(dueDate)).toLocaleDateString()}</span> </p>}

    </div>
  )
}
