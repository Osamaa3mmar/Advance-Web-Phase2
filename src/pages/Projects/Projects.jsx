import { useState } from "react";
import Modal from "../../component/Modal/Modal";
import ProjectsForm from "../../component/Projects/Form/ProjectsForm";
import SideOpen from "../../component/Projects/SideOpen/SideOpen";
import Tools from "../../component/Projects/Tools/Tools";
import ProjectArea from "../../component/Projects/ProjectsArea/ProjectArea";
export default function Projects() {
  const [modal,setModal]=useState(false);
  const [side,setSide]=useState(false);

  return (
    <div className=" scroll w-[95%] m-auto  min-h-[100dvh] ">
      <Tools modelControl={setModal}/>
      <Modal status={modal} onClose={setModal} title={"Add New Project"}>
      <ProjectsForm/>
      </Modal>
      <SideOpen status={side} closeSide={setSide}/>
      <ProjectArea openSide={setSide} />
    </div>
  )
}
