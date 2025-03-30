import Swal from "sweetalert2";
import AsMuiBtn from "./AsMuiBtn";
import Chip from "./Chip";
import ProgressPar from "./ProgressPar";
import style from './style.module.css';
import { Tooltip } from 'react-tooltip'

export default function ProjectCard({openSide,refresh,project}) {
  const handleDelete=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const projects=JSON.parse(localStorage.getItem('projects'));
    const newProjects=projects.filter((p)=>{
      return p.id!=id;
    })
      localStorage.setItem('projects',JSON.stringify(newProjects));
        refresh(project.id);
        Swal.fire({
          title: "Deleted!",
          text: "Project has been deleted.",
          icon: "success"
        });
      }
    });
    
  }
  return (
    <div  className={style.projectCard +" hover:scale-[1.02] duration-300 text-white bg-[#333333]"}>
        <h3 className=" text-[#027bfe] font-bold text-2xl pb-2">{project&&project.title!=''?project.title:'null'} </h3>
        <div className="my-2 line bg-[#9c9c9c] w-[100%] h-[2px] rounded-3xl"></div>
        <p className=" py-1 "><span className="font-bold text-lg">Description:</span> {project&&project.description!=''?project.description:'No Description '}</p>
        <p className=" py-1"><span className="font-bold text-lg">Students:</span></p >
        <div className=" mt-2 gap-2 flex flex-wrap items-center ">
        {project&&project.students.length>0?project.students.map((stu,index)=>{
          return <Chip stu={stu} key={index}/>
        }):"No Students !"}
        
        </div>
        
        <p className=" py-1"><span className="font-bold text-lg">Category:</span>{project?.category} </p>

        <ProgressPar/>
        <div className="date my-3 flex items-center justify-between">
            <p style={{cursor:"pointer"}} data-tooltip-id="start" data-tooltip-offset={5} className={" bg-[rgba(0,255,0,0.2)] px-[10px] py-[4px] rounded-2xl "+ style.startDate }>{project?.startDate}</p>
            <p style={{cursor:"pointer"}} data-tooltip-id="end" data-tooltip-offset={5} className={" bg-[rgba(255,0,0,0.2)] px-[10px] py-[4px] rounded-2xl "+style.deadLineDate }>{project?.endDate}</p>
        </div>
        <div className="my-2 line bg-[#9c9c9c] w-[100%] h-[2px] rounded-3xl"></div>

        <div className="flex gap-8 items-center justify-between">
            <AsMuiBtn id={project.id} openSide={openSide} text={"View"} variant={"view"}/>
            <button className="py-[10px] cursor-pointer duration-300 rounded-lg  flex-1 bg-[rgba(255,0,0,0.6)] hover:bg-[red]" onClick={()=>{handleDelete(project.id)}}>Delete</button>
                    </div>
        <Tooltip  id="start" content="Start Date !" key={"right"} place="right"  />
        <Tooltip  id="end" content="End Date !" key={"left"} place="left"  />
    </div>
  )
}
