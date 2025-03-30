import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
export default function ProjectArea({openSide,getProjects,refresh}) {
      const [projects,setProjects]=useState(null);
useEffect(()=>{
  setProjects(getProjects());
},[getProjects])
  return (
    <div className="py-[20px] px-[20px] m-auto grid grid-flow-row lg:grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1">
     {projects?projects.map((item,index)=>{
      return <ProjectCard project={item} refresh={refresh} openSide={openSide} key={index}/>
     }):<h2>nothing</h2>}
    </div>
  )
}
