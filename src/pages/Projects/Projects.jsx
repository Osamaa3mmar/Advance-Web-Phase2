import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../../component/Modal/Modal";
import ProjectsForm from "../../component/Projects/Form/ProjectsForm";
import SideOpen from "../../component/Projects/SideOpen/SideOpen";
import Tools from "../../component/Projects/Tools/Tools";
import ProjectArea from "../../component/Projects/ProjectsArea/ProjectArea";
export default function Projects() {
  const [modal,setModal]=useState(false);
  const [side,setSide]=useState(false);
  const [refresh,setRefresh]=useState(false);
  const getProjects=useCallback(()=>{
    const projects =JSON.parse(localStorage.getItem("projects"));
    return projects;
  },[refresh])
  return (
    <div className=" scroll w-[95%] m-auto  min-h-[100dvh] ">
      <Tools modelControl={setModal}/>
      <Modal status={modal} onClose={setModal} title={"Add New Project"}>
      <ProjectsForm refresh={setRefresh} closeForm={setModal}/>
      </Modal>
      <SideOpen status={side} closeSide={setSide}/>
      <ProjectArea refresh={setRefresh} getProjects={getProjects}  openSide={setSide} />
    </div>
  )
}
