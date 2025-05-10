import { useContext, useEffect, useMemo, useState } from "react";
import Modal from "../../component/Modal/Modal";
import ProjectsForm from "../../component/Projects/Form/ProjectsForm";
import SideOpen from "../../component/Projects/SideOpen/SideOpen";
import Tools from "../../component/Projects/Tools/Tools";
import ProjectArea from "../../component/Projects/ProjectsArea/ProjectArea";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function Projects() {
  const [modal,setModal]=useState(false);
  const [side,setSide]=useState(false);
  const [data,setData]=useState([]);
  const [search,setSearch]=useState('');
  const {user}=useContext(CurrentUserContext);
  const getData=async()=>{
    try{
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        setLoading(false);
        return;
      }
      
      // GraphQL query for getting all projects
      const query = `
        query Projects {
          projects {
            id
            name
            startDate
            endDate
            description
            status
            category
            users {
              id
              username
              type
              uid
            }
          }
        }
      `;
      
      const response = await axios.post("http://localhost:4001/graphql", {
        query
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const graphqlProjects = response.data.data.projects;
      const formattedProjects = graphqlProjects.map(project => ({
        id: project.id,
        title: project.name,
        description: project.description,
        students: project.users.map(user => user.id),
        category: project.category,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status
      }));
      if (user && user.role !== 'admin') {
        const filteredProjects = formattedProjects.filter(project => {
          return project.students.find(studentId => {
            return user && studentId == user.id;
          });
        });
        setData(filteredProjects);
      } 
    }catch(error){}
    // const projects=JSON.parse(localStorage.getItem('projects'));
    // if(!projects){
    //   setData([]);
    // }
    // else if(user&&user.role!='admin'){
    //   const temp=projects.filter((project)=>{
    //     return project.students.find((studentId)=>{
    //       return user && studentId==user.id;
    //     });
    //   })
    //   setData(temp);
    // }else{
    //   setData(projects);
    // }
  }
  const filteredData=useMemo(()=>{
    if(!search){
      return data
    }
    if(search.type=='title')
    return data.filter((project)=>{
      return project.name.toLowerCase().includes(search.title.toLowerCase());
    })

    else
    return data.filter((project)=>{
      return project.status.toLowerCase().includes(search.status.toLowerCase());
    })
  },[data,search]);


const addProject = async (projectData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error("Authentication token not found. Please login again.");
      return;
    }
    
    // GraphQL mutation for creating a project
    const query = `
      mutation CreateProject {
        createProject(
          input: {
            name: "${projectData.title}",
            startDate: "${projectData.startDate}",
            endDate: "${projectData.endDate}",
            description: "${projectData.description}",
            status: "${projectData.status}",
            category: "${projectData.category}"
          }
        ) {
          id
          name
          startDate
          endDate
          description
          status
          category
          users {
            id
            username
            type
            uid
          }
        }
      }
    `;
    
    const response = await axios.post("http://localhost:4001/graphql", {
      query
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    
    // Get the created project from response
    const createdProject = response.data.data.createProject;
    
    // Format the project to match the expected structure in the app
    const formattedProject = {
      id: createdProject.id,
      title: createdProject.name,
      description: createdProject.description,
      students: projectData.students, // Keep the selected students
      category: createdProject.category,
      startDate: createdProject.startDate,
      endDate: createdProject.endDate,
      status: createdProject.status
    };
    
    // Update the state with the new project
    setData(prevData => [...prevData, formattedProject]);
    
    // Refresh the project list
    getData();
    
    toast.success("Project created successfully!");
  } catch (error) {
    console.error('Error creating project:', error);
    toast.error(`Failed to create project: ${error.message}`);
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
