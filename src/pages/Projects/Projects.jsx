import Modal from "../../component/Modal/Modal";
import ProjectsForm from "../../component/Projects/Form/ProjectsForm";
import ProjectsContainer from "../../component/Projects/ProjectsContainer/ProjectsContainer";
import SideOpen from "../../component/Projects/SideOpen/SideOpen";
import Tools from "../../component/Projects/Tools/Tools";

export default function Projects() {
  return (
    <div>
      <Tools/>
      <ProjectsContainer/>
      <SideOpen/>
      <Modal>
        <ProjectsForm/>
      </Modal>
    </div>
  )
}
