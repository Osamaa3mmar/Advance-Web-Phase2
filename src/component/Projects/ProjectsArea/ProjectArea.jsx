import ProjectCard from "./ProjectCard";
export default function ProjectArea({openSide}) {
    const arr=['a', 'b', 'c', 'd', 'e'];
  return (
    <div className="py-[20px] px-[20px] m-auto grid grid-flow-row lg:grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1">
     {arr.map((item,index)=>{
      return <ProjectCard openSide={openSide} key={index}/>
     })}
    </div>
  )
}
