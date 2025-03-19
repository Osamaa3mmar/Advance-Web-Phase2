import { useState } from "react";
import Modal from "../../component/Modal/Modal";
import ProjectsForm from "../../component/Projects/Form/ProjectsForm";
import ProjectsContainer from "../../component/Projects/ProjectsContainer/ProjectsContainer";
//import SideOpen from "../../component/Projects/SideOpen/SideOpen";
import Tools from "../../component/Projects/Tools/Tools";

export default function Projects() {
  const [modal,setModal]=useState(false);
  return (
    <div className=" w-[95%] m-auto relative min-h-[100dvh]">
      <Tools modelControl={setModal}/>
      <ProjectsContainer/>
      <Modal status={modal} onClose={setModal} title={"Add New Project"}>
      <ProjectsForm/>
      </Modal>
      {/* <SideOpen/>*/}
    </div>
  )
}
