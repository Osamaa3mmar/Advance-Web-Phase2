import { useEffect, useMemo, useState } from "react";
import Modal from "../../component/Modal/Modal";
import ProjectsForm from "../../component/Projects/Form/ProjectsForm";
import SideOpen from "../../component/Projects/SideOpen/SideOpen";
import Tools from "../../component/Projects/Tools/Tools";
import ProjectArea from "../../component/Projects/ProjectsArea/ProjectArea";
export default function Projects() {
  const [modal,setModal]=useState(false);
  const [side,setSide]=useState(false);
  const [data,setData]=useState([]);
  const [search,setSearch]=useState('');
  const getData=()=>{
    const projects=JSON.parse(localStorage.getItem('projects'));
    if(!projects){
      setData([]);
    }
    else{
      setData(projects);
    }
  }
  const filteredData=useMemo(()=>{
    return data.filter((project)=>{
      return project.title.toLowerCase().includes(search.toLowerCase());
    })
  },[data,search]);


const addProject=(data)=>{
  const projects=JSON.parse(localStorage.getItem('projects'));
  if(!projects){
    data.id=1;
    setData([data]);
    localStorage.setItem('projects',JSON.stringify([data]));
  }
  else{
    data.id=projects.length+1;
    projects.push(data);
    localStorage.setItem('projects',JSON.stringify(projects));
    setData(projects);
  }
}

  const deleteProject=(id)=>{
    const newData=data.filter((project)=>{
      return project.id!=id;
    });
    localStorage.setItem('projects',JSON.stringify(newData));
    setData(newData);
  }



  useEffect(()=>{
    getData();
  },[])

  return (
    <div className=" scroll w-[95%] m-auto  min-h-[100dvh] ">
      <Tools searchTerm={setSearch} modelControl={setModal}/>
      <Modal status={modal} onClose={setModal} title={"Add New Project"}>
      <ProjectsForm addProject={addProject} closeForm={setModal}/>
      </Modal>
      <SideOpen status={side} closeSide={setSide}/>
      <ProjectArea deleteProject={deleteProject} projects={filteredData}  openSide={setSide} />
    </div>
  )
}
