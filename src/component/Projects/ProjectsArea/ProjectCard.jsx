import Swal from "sweetalert2";
import AsMuiBtn from "./AsMuiBtn";
import Chip from "./Chip";
import ProgressPar from "./ProgressPar";
import style from './style.module.css';
import { Tooltip } from 'react-tooltip'
import { CurrentUserContext } from "../../../Context/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

export default function ProjectCard({openSide,project,deleteProject}) {
  const {user}=useContext(CurrentUserContext);
  const [percent,setPercent]=useState(0);
  console.log(project)
  const confirmAlert= async ()=>{
    const answer=await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    return answer
  }
  const handleDelete=async(id)=>{
    const result=await confirmAlert();
    if (result.isConfirmed) {
      deleteProject(id);
      Swal.fire({
        title: "Deleted!",
        text: "Project has been deleted.",
        icon: "success"
      });
    }

  }
  const makePercentage=()=>{
    const tasks=project?.tasks;
    if(tasks){
      let total=0;
      let complete=0;
      tasks.forEach(task=>{
          total++;
          if(task.status=="completed"){
            complete++;
          }
        
      })
      if(total==0||complete==0){
        setPercent(0);
      }
      else
      setPercent(Math.floor((complete/total)*100));
    }
  }
  useEffect(()=>{
    makePercentage()
  },[project])
  return (
    <div  className={style.projectCard +" hover:scale-[1.02] duration-300 text-white bg-[#333333]"}>
        <h3 className=" text-[#027bfe] font-bold text-2xl pb-2">{project&&project.title!=''?project.title:'null'} </h3>
        <h2 className={` py-[4px] px-[6px] rounded-3xl absolute top-[24px] right-[30px]
           ${project?.status=="cancelled"?
           "bg-red-500":
           project.status=="onHold"?
           "bg-amber-400":
           project.status=="pending"?
           "bg-yellow-300":
           project.status=="completed"?
           "bg-green-500":
           project.status=="inProgress"?
           "bg-sky-600":"bg-teal-500"}`}>{project?.status}</h2>
        <div className="my-2 line bg-[#9c9c9c] w-[100%] h-[2px] rounded-3xl"></div>
        <p className=" py-1 "><span className="font-bold text-lg">Description:</span> {project&&project.description!=''?project.description:'No Description '}</p>
        <p className=" py-1"><span className="font-bold text-lg">Students:</span></p >
        <div className=" mt-2 gap-2 flex flex-wrap items-center ">
        {project&&project.students?.length>0?project.students.map((stu,index)=>{
          return <Chip stu={stu} key={index}/>
        }):"No Students !"}
        </div>
        <p className=" py-1"><span className="font-bold text-lg">Category:</span>{project?.category} </p>
        <ProgressPar value={percent}/>
        <div className="date my-3 flex items-center justify-between">
            <p style={{cursor:"pointer"}} data-tooltip-id="start" data-tooltip-offset={5} className={" bg-[rgba(0,255,0,0.2)] px-[10px] py-[4px] rounded-2xl "+ style.startDate }>{project?.startDate ? new Date(parseInt(project.startDate)).toISOString().split('T')[0] : "N/A"}</p>
            <p style={{cursor:"pointer"}} data-tooltip-id="end" data-tooltip-offset={5} className={" bg-[rgba(255,0,0,0.2)] px-[10px] py-[4px] rounded-2xl "+style.deadLineDate }>{project?.endDate ? new Date(parseInt(project.endDate)).toISOString().split('T')[0] : "N/A"}</p>
        </div>
        <div className="my-2 line bg-[#9c9c9c] w-[100%] h-[2px] rounded-3xl"></div>

        <div className="flex gap-8 items-center justify-between">
            <AsMuiBtn id={project.id} openSide={openSide} text={"View"} variant={"view"}/>
            {user?user.role=="admin"?
            <button className="py-[10px] cursor-pointer duration-300 rounded-lg  flex-1 bg-[rgba(255,0,0,0.6)] hover:bg-[red]" onClick={()=>{handleDelete(project.id)}}>Delete</button>
            :null:null}
                    </div>
        <Tooltip  id="start" content="Start Date !" key={"right"} place="right"  />
        <Tooltip  id="end" content="End Date !" key={"left"} place="left"  />
    </div>
  )
}
