import { useState } from 'react';
import style from './style.module.css'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
export default function ProjectsForm({closeForm,refresh}) {
  const [project,setProject]=useState({
    title:'',
    description:'',
    students:[],
    category:'',
    startDate:'',
    endDate:'',
    status:''
  })
  const users=JSON.parse(localStorage.getItem('users'));
  const handleChange=(e)=>{
    const { name, value, multiple, options } = e.target;

    if (multiple) {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setProject(prevProjects => ({
        ...prevProjects,
        [name]: selectedValues
      }));
    } else {
      setProject(prevProjects => ({
        ...prevProjects,
        [name]: value
      }));
    }
    
  }
  const createProject=(e)=>{
    e.preventDefault();
    const projects=JSON.parse(localStorage.getItem('projects'));
    if(!projects) {
      project.id=1;
      localStorage.setItem('projects',JSON.stringify([project]));
      
    }
    else{
      project.id=projects.length+1;
      
    projects.push(project);
    localStorage.setItem('projects',JSON.stringify(projects));
    }
    Swal.fire({
      title: "Project created successfully !",
      icon: "success"
    });
    closeForm(false);
    refresh(e.target);
  }
 const clearForm=()=>{
  toast.info("Form cleared !");
  setProject({
    title:'',
    description:'',
    students:[],
    category:'',
    startDate:'',
    endDate:'',
    status:''
  });
 }
  return (
    <form onSubmit={createProject} className={"w-full my-3 px-[15px] flex flex-col gap-3 overflow-auto h-[430px]  text-white "+ style.formScroll}>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Title :</h3>
        <input value={project.title} name={'title'} onChange={handleChange} type="text" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Description :</h3>
        <textarea value={project.description} name={'description'} onChange={handleChange} rows={5} className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg" id=""></textarea>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Students List :</h3>
        <select value={project.students} name='students' onChange={handleChange} multiple={true} size={"5"} className=' duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg '>
          {users.map((user,index)=>{
            return <option value={user.id} key={index} className=' '>{user.name}</option>
            })}
        </select>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Category :</h3>
        <select value={project.category} name='category' onChange={handleChange} className=' duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg '>
          <option value="1" className=' '>osama</option>
          <option value="2" className=' '>ali</option>
          <option value="3" className=' '>mahmoud</option>
          <option value="4" className=' '>hosam</option>
          <option value="5" className=' '>moahmmed</option>
        </select>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Starting Date :</h3>
        <input value={project.startDate} name='startDate' onChange={handleChange} type="date" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>
      <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Ending Date :</h3>
        <input value={project.endDate} name='endDate' onChange={handleChange} type="date" className=" outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"/>
      </div>
     <div className="inputContainer flex flex-col gap-2 w-full ">
        <h3 className=" text-lg font-semibold">Project Status :</h3>
        <select value={project.status} name='status' onChange={handleChange} className=' duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg '>
          <option value="status" className=' '>status</option>
          <option value="inProgress" className=' '>In Progress</option>
          <option value="completed" className=' '>Completed</option>
          <option value="pending" className=' '>Pending</option>
          <option value="onHold" className=' '>On Hold</option>
          <option value="cancelled" className=' '>Cancelled</option>
        </select>
      </div>
      <div className="btns flex items-center gap-6">
      <button type='button' className='  text-[#027bfe] hover:bg-[rgba(3,125,255,0.2)] py-[10px] cursor-pointer duration-300 rounded-lg  flex-1' onClick={clearForm}>Clear</button>
      <button  className=' bg-[rgba(3,125,255,0.4)] hover:bg-[#027bfe] py-[10px] cursor-pointer duration-300 rounded-lg  flex-1' type='submit'>Add</button>
      </div>
    </form>
  )
}
