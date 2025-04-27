import { useContext, useEffect, useMemo, useState } from "react";
import Modal from "../../component/Modal/Modal";
import ProjectsForm from "../../component/Projects/Form/ProjectsForm";
import SideOpen from "../../component/Projects/SideOpen/SideOpen";
import Tools from "../../component/Projects/Tools/Tools";
import ProjectArea from "../../component/Projects/ProjectsArea/ProjectArea";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
export default function Projects() {
  const [modal,setModal]=useState(false);
  const [side,setSide]=useState(false);
  const [data,setData]=useState([]);
  const [search,setSearch]=useState('');
  const {user}=useContext(CurrentUserContext);
  const getData=()=>{
    const projects=JSON.parse(localStorage.getItem('projects'));
    if(!projects){
      setData([]);
    }
    else if(user&&user.role!='admin'){
      const temp=projects.filter((project)=>{
        return project.students.find((studentId)=>{
          return user && studentId==user.id;
        });
      })
      setData(temp);
    }else{
      setData(projects);
    }
  }
  const filteredData=useMemo(()=>{
    if(!search){
      return data
    }
    if(search.type=='title')
    return data.filter((project)=>{
      return project.title.toLowerCase().includes(search.title.toLowerCase());
    })

    else
    return data.filter((project)=>{
      return project.status.toLowerCase().includes(search.status.toLowerCase());
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
      <Tools  searchTerm={setSearch} modelControl={setModal}/>
      <Modal status={modal} onClose={setModal} title={"Add New Project"}>
      <ProjectsForm addProject={addProject} closeForm={setModal}/>
      </Modal>
      <SideOpen status={side} closeSide={setSide}/>
      <ProjectArea deleteProject={deleteProject} projects={filteredData}  openSide={setSide} />
    </div>
  )
}
