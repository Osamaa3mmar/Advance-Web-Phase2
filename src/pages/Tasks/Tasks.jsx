import { useContext, useEffect, useMemo } from "react";
import { useState } from "react"
import { TasksHeader } from "./TasksHeader";
import Modal from "../../component/Modal/Modal";
import TaskForm from "./TaskForm";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import TaskTable from "./TaskTable";

export default function Tasks() {
  const [modal,setModal]=useState(false);
  const [searchTerm,setSearchTerm]=useState(null);
  const [trig,setTrig]=useState(false);
  const {user}=useContext(CurrentUserContext);
  const currentTasks=useMemo(()=>{
    const tempTasks=JSON.parse(localStorage.getItem('tasks'));
    if(!tempTasks)
      return null;

    const tasks=user?user.role=='admin'?tempTasks:
    tempTasks.filter((task)=>{
      return task.student.id==user.id;
    })
    :null;

    if(searchTerm){
      return tasks.filter((task)=>{
        return task.status.toLowerCase()==searchTerm.toLowerCase();
      })
    }
    return tempTasks;
    
  },[user,searchTerm,trig]);
 
  useEffect(()=>{
  },[])
  const modalToggle=()=>{
    setModal(prev=>!prev);
  }

  return (
    <div className=" py-[3%] px-[4%] flex flex-col gap-4">
      <TasksHeader setModal={setModal} />
      <Modal onClose={modalToggle} status={modal} title={"Add New Task"}>
      <TaskForm trig={setTrig} closeForm={setModal} />
      </Modal>
      <TaskTable tasks={currentTasks}/>
    </div>
  )
}
