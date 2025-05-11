import ProjectCard from "./ProjectCard";
export default function ProjectArea({openSide,projects,deleteProject}) {
  return (
    <div className="py-[20px] px-[20px] m-auto grid grid-flow-row xl:grid-cols-3 gap-8 lg:grid-cols-2 sm:grid-cols-1">
     {projects?projects.map((item,index)=>{
      return <ProjectCard deleteProject={deleteProject} project={item} openSide={openSide} key={index}/>
     }):<h2>nothing</h2>}
    </div>
  )
}
