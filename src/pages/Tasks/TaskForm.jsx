import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import style from '../../component/Projects/Form/style.module.css'
export default function TaskForm({closeForm,trig}) {
    const [task,setTask]=useState({
        id:0,
        name:"",
        project:{
            id:0,
            title:""
        },
        description:"",
        student:{
            id:0,
            username:"",
        },
        status:'',
        dueDate:''
    });
    const [projects,setProjects]=useState([]);
    const [students,setStudents]=useState([]);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setTask(prevProjects => ({
            ...prevProjects,
            [name]: value
          }));
    }
const getStudents=(id)=>{
  const currentProject =projects.find((project)=>{
    return project.id==id;
  })
  const students=currentProject.students;
  const studentsStorage=JSON.parse(localStorage.getItem("users"))||[];
  const finalStudents=studentsStorage.filter((stu)=>{
    for(let i=0;i<students.length;i++){
      if(students[i]==stu.id){
        return true;
      }
    }
  });
  setStudents(finalStudents);
}

    const handleSelect=(e)=>{
        const info=e.target.value;
        const name=e.target.name;
        if(name=="project"){
            setTask(prev=>({...prev,project:{
                id:info.split('__')[1],
                title:info.split('__')[0]
            }}))
            getStudents(info.split('__')[1]);
        }
        else{
            setTask(prev=>({...prev,student:{
                id:info.split('__')[1],
                username:info.split('__')[0]
            }}))
        }
       
    }
    const addTask=(task)=>{
        let tasks=JSON.parse(localStorage.getItem('tasks'));
        if(tasks){
            tasks.push(task);

        }
        else{
            tasks=[task];
        }
        trig(prev=>!prev);
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
     const createTask=(e)=>{
        e.preventDefault();
        addTask(task);
        Swal.fire({
          title: "Task created successfully !",
          icon: "success"
        });
        closeForm(false);
      }
      const getData=()=>{
        const projects=JSON.parse(localStorage.getItem("projects"));
        //const students=JSON.parse(localStorage.getItem("users"));
        const tasks=JSON.parse(localStorage.getItem("tasks"));
        if(projects){
            setProjects(projects);
        }
        // if(students){
        //     setStudents(students);
        // }
        setTask(prev=>({...prev,id:tasks?tasks.length+1:1}));
      }
      useEffect(()=>{
        getData();
      },[])
  return (
    <form onSubmit={createTask} className={"w-full my-3 px-[15px] flex flex-col gap-3 overflow-auto h-[430px]  text-white "+ style.formScroll}>
         <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Title :</h3>
        <select value={task.project.title+"__"+task.project.id} required name='project' onChange={handleSelect} className=' duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg '>
          <option value="osama__1" className=' '>Title</option>
          {
            projects?.map((project,index)=>{
                return <option key={index}  value={`${project.title}__${project.id}`} className=' '>{project.title}</option>
            } 

            )
          }
          
        </select>
      </div>
        <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Task Name :</h3>
        <input required value={task.name} name={'name'} onChange={handleChange} type="text" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Description :</h3>
        <textarea required value={task.description} name={'description'} onChange={handleChange} rows={5} className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg" id=""></textarea>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Assigned Student :</h3>
        <select required value={task.student.username+"__"+task.student.id} name='student' onChange={handleSelect} className=' duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg '>
          <option value="Students_1" className=' '>Students</option>
          {
            students?.map((student,index)=>{
                return <option key={index}  value={`${student.username}__${student.id}`} className=' '>{student.username}</option>
            } 

            )
          }
        </select>
      </div>



      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Task Status :</h3>
        <select required value={task.status} name='status' onChange={handleChange} className=' duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg '>
          <option value="status" className=' '>status</option>
          <option value="inProgress" className=' '>In Progress</option>
          <option value="completed" className=' '>Completed</option>
          <option value="pending" className=' '>Pending</option>
          <option value="onHold" className=' '>On Hold</option>
          <option value="cancelled" className=' '>Cancelled</option>
        </select>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Due Date :</h3>
        <input value={task.dueDate} name='dueDate' onChange={handleChange} type="date" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>
      <button  className=' bg-[rgba(3,125,255,0.4)] hover:bg-[#027bfe] py-[10px] cursor-pointer duration-300 rounded-lg  flex-1' type='submit'>Add</button>


    </form>
  )
}
