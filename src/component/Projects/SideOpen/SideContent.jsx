import { useEffect, useState } from "react";
import TaskCard from "../../Task/TaskCard";
import Chip from "../ProjectsArea/Chip";
import style from '../ProjectsArea/style.module.css';

export default function SideContent({id}) {
  const [project,setProject]=useState(null);
  const [tasks,setTasks]=useState(null);

  console.log(tasks);
  const getData=()=>{
    const temp=JSON.parse(localStorage.getItem("projects"));
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    const proj=temp.find((project)=>{
      return project.id==id
    })
    if(tasks){
    const tempTasks=tasks.filter((task)=>{
      return task.project.id==id;
    })
    setTasks(tempTasks);
  }
    setProject(proj);
  }

  useEffect(()=>{
    getData();
  },[]);


  return (
    <div className="text-white  h-[100%]  ">
      <h2 className=" text-[#00bcd4] font-bold text-xl ml-[20px] mt-[10px]">{project?.title}</h2>
      <div className="line w-[95%] m-auto h-[2px] bg-[#363636] rounded-3xl my-[10px]" ></div>
        <p className=" py-1 "><span className="font-bold text-lg">Description:</span> {project?.description}</p>
              <p className=" py-1"><span className="font-bold text-lg">Students:</span></p >
              <div className=" mt-2 gap-2 flex flex-wrap items-center ">
                {project?.students.map((student,index)=>{
              return <Chip stu={student} key={index}/>

                })}
              
              </div>
              <p className=" py-1"><span className="font-bold text-lg">Category:</span> </p>
              <div className=" mt-2 gap-2 flex flex-wrap items-center ">
                <div className=" bg-blue-400 py-[6px] px-[10px] rounded-2xl ">{project?.category}</div>
              </div>
              <div className="date my-6 flex items-center justify-between">
                  <p style={{cursor:"pointer"}} data-tooltip-id="start" data-tooltip-offset={5} className={" bg-[rgba(0,255,0,0.2)] px-[10px] py-[4px] rounded-2xl "+ style.startDate }>{project?.startDate}</p>
                  <p style={{cursor:"pointer"}} data-tooltip-id="end" data-tooltip-offset={5} className={" bg-[rgba(255,0,0,0.2)] px-[10px] py-[4px] rounded-2xl "+style.deadLineDate }>{project?.endDate}</p>
              </div>
      <div className="line w-[95%] m-auto h-[2px] bg-[#363636] rounded-3xl my-[10px]" ></div>
        <div className=" flex items-center gap-3 flex-col">
          {tasks?tasks.length>0?tasks.map((task)=>{
            return  <TaskCard key={task.id} {...task}/>
          }):<h2 className=" text-2xl">No tasks Yet</h2>:""}
            
        </div>
    </div>
  )
}
