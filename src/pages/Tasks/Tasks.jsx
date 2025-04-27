import { useEffect } from "react";
import { useState } from "react"
import { TasksHeader } from "./TasksHeader";
import Modal from "../../component/Modal/Modal";
import TaskForm from "./TaskForm";

export default function Tasks() {
  const [tasks,setTasks]=useState([]);
  const [modal,setModal]=useState(false);
  const getTasks=()=>{
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    if(tasks)
    setTasks(tasks);
  }
  useEffect(()=>{
    getTasks();
  },[])
  const modalToggle=()=>{
    setModal(prev=>!prev);
  }

  return (
    <div className=" py-[3%] px-[4%]">
      <TasksHeader setModal={setModal} />



      <Modal onClose={modalToggle} status={modal} title={"Add New Task"}>
      <TaskForm closeForm={setModal} />
      </Modal>
    </div>
  )
}
