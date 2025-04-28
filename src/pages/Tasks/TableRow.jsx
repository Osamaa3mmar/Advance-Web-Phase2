import style from './style.module.css'
export default function TableRow({trig,id,name,project,description,student,status,dueDate}) {
  const toggleStatus=()=>{
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    const task=tasks.find((task)=>{
      return task.id===id;
    })
    if(status=="inProgress"){
      task.status="completed";
    }
    else if(status=="completed"){
      task.status="pending";

    }
    else if(status=="pending"){
      task.status="onHold";
    }
    else if(status=="onHold"){
      task.status="cancelled";

    }
    else if(status=="cancelled"){
      task.status="inProgress";

    }
    localStorage.setItem("tasks",JSON.stringify(tasks));
    trig(prev=>!prev);
  }

  
  return (
    <tr className={" border-[#3f3f3f] border-b-1 "+style.hoverTabelRow}>
      <td className="px-4 py-2 w-[10%]">{id}</td>
      <td className="px-4 py-2 w-[20%]">{project.title}</td>
      <td className="px-4 py-2 w-[10%]">{name}</td>
      <td className="px-4 py-2 w-[30%]">{description}</td>
      <td className="px-4 py-2 w-[10%]">{student.username}</td>
      <td 
  className={
    (status === "cancelled" ? `${style.taskStatusBtnRed}` :
     status === "onHold" ? `${style.taskStatusBtnOrange}` :
     status === "pending" ? `${style.taskStatusBtnYellow}` :
     status === "completed" ? `${style.taskStatusBtnGreen}` :
     status === "inProgress" ? `${style.taskStatusBtnBlue}` :
     "bg-teal-500") + 
    " px-4 py-2 w-[6%] "+ `${style.taskStatusBtn}`
  }
  onClick={toggleStatus}
>{status}</td>
      <td className="px-4 py-2 w-[14%]">{dueDate}</td>
    </tr>
  )
}
