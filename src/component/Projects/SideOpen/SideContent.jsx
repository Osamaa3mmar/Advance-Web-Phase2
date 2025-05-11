import { useEffect, useState } from "react";
import TaskCard from "../../Task/TaskCard";
import Chip from "../ProjectsArea/Chip";
import style from '../ProjectsArea/style.module.css';
import axios from "axios";

export default function SideContent({id}) {
  const [project,setProject]=useState(null);
  const [tasks,setTasks]=useState(null);

  console.log(tasks);
  const getData=async ()=>{
    try{
      const query = `query Project {
        project(id: ${id}) {
          id
          name
          startDate
          endDate
          description
          status
          category
          users {
            id
            username
            type
            uid
          }
          tasks {
            id
            name
            dueDate
            status
            description
            project_ID
            user_ID
          }
        }
      }`;
      
      const {data} = await axios.post("http://localhost:4001/graphql", {
        query
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log(data);
      if(data.data && data.data.project) {
        setProject(data.data.project);
        setTasks(data.data.project.tasks);
      }
    } catch(error){
      console.log(error);
    }
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
                {project?.users.map((student,index)=>{
              return <Chip stu={student} key={index}/>

                })}
              
              </div>
              <p className=" py-1"><span className="font-bold text-lg">Category:</span> </p>
              <div className=" mt-2 gap-2 flex flex-wrap items-center ">
                <div className=" bg-blue-400 py-[6px] px-[10px] rounded-2xl ">{project?.category}</div>
              </div>
              <div className="date my-6 flex items-center justify-between">
                  <p style={{cursor:"pointer"}} data-tooltip-id="start" data-tooltip-offset={5} className={" bg-[rgba(0,255,0,0.2)] px-[10px] py-[4px] rounded-2xl "+ style.startDate }>{project?.startDate?new Date(parseInt(project.startDate)).toISOString().split('T')[0]:"N/A"}</p>
                  <p style={{cursor:"pointer"}} data-tooltip-id="end" data-tooltip-offset={5} className={" bg-[rgba(255,0,0,0.2)] px-[10px] py-[4px] rounded-2xl "+style.deadLineDate }>{project?.endDate?new Date(parseInt(project.endDate)).toISOString().split('T')[0]:"N/A"}</p>
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
