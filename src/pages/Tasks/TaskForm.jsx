import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import style from '../../component/Projects/Form/style.module.css'
import axios from "axios";
import { toast } from "react-toastify";
export default function TaskForm({closeForm, refreshTasks}) {
    const [task, setTask] = useState({
        name: "",
        project_ID: "",
        description: "",
        user_ID: "",
        status: '',
        dueDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    }
    
    // Fetch users associated with a project
    const getProjectUsers = async (projectId) => {
        try {
            const query = `query Project {
                project(id: ${projectId}) {
                    users {
                        id
                        username
                        type
                    }
                }
            }`;
            
            const { data } = await axios.post("http://localhost:4001/graphql", {
                query
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (data.data && data.data.project && data.data.project.users) {
                setProjectUsers(data.data.project.users);
            }
        } catch (error) {
            console.error("Error fetching project users:", error);
            toast.error("Failed to load project users");
        }
    }

    const handleSelect = (e) => {
        const { name, value } = e.target;
        
        if (name === "project_ID") {
            setTask(prev => ({
                ...prev,
                project_ID: value
            }));
            getProjectUsers(value);
        } else if (name === "user_ID") {
            setTask(prev => ({
                ...prev,
                user_ID: value
            }));
        }
    }
    const createTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Validate required fields
        if (!task.name || !task.description || !task.project_ID || !task.user_ID || !task.dueDate || !task.status) {
            toast.error("Please fill in all required fields");
            setLoading(false);
            return;
        }
        
        try {
            // Format date as YYYY-MM-DD for GraphQL
            const formattedDate = task.dueDate;
            
            // Use a variable for the mutation to avoid syntax errors
            const query = `mutation CreateTask($input: CreateTaskInput!) {
                createTask(input: $input) {
                    id
                    name
                    dueDate
                    status
                    description
                    project_ID
                    user_ID
                }
            }`;
            
            // Create variables object
            const variables = {
                input: {
                    name: task.name,
                    description: task.description,
                    status: task.status || "inProgress",  // Use the selected status or default to inProgress
                    dueDate: formattedDate,
                    project_ID: task.project_ID,
                    user_ID: task.user_ID
                }
            };
            
            console.log("Sending GraphQL mutation with variables:", variables);
            
            const { data } = await axios.post("http://localhost:4001/graphql", {
                query,
                variables
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            console.log("GraphQL response:", data);
            
            if (data.data && data.data.createTask) {
                Swal.fire({
                    title: "Task created successfully!",
                    icon: "success"
                });
                refreshTasks();
                closeForm(false);
            } else if (data.errors) {
                console.error("GraphQL errors:", data.errors);
                const errorMessage = data.errors[0]?.message || "Failed to create task";
                toast.error(errorMessage);
            } else {
                toast.error("Unknown error occurred while creating task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
            toast.error("Error creating task: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    }
    // Fetch projects and users data
    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch projects
            const projectsQuery = `query Projects {
                projects {
                    id
                    name
                }
            }`;
            
            const projectsResponse = await axios.post("http://localhost:4001/graphql", {
                query: projectsQuery
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (projectsResponse.data.data && projectsResponse.data.data.projects) {
                setProjects(projectsResponse.data.data.projects);
            }
            
            // Fetch users
            const usersQuery = `query Users {
                users {
                    id
                    username
                    type
                }
            }`;
            
            const usersResponse = await axios.post("http://localhost:4001/graphql", {
                query: usersQuery
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (usersResponse.data.data && usersResponse.data.data.users) {
                setUsers(usersResponse.data.data.users);
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load form data");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [])
  return (
    <form onSubmit={createTask} className={"w-full my-3 px-[15px] flex flex-col gap-3 overflow-auto h-[430px] text-white "+ style.formScroll}>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <div className="inputContainer flex flex-col gap-2 w-full">
            <h3 className="text-lg font-semibold">Project :</h3>
            <select 
              value={task.project_ID} 
              required 
              name='project_ID' 
              onChange={handleSelect} 
              className='duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg'
            >
              <option value="" className=''>Select Project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputContainer flex flex-col gap-2 w-full">
            <h3 className="text-lg font-semibold">Task Name :</h3>
            <input 
              required 
              value={task.name} 
              name='name' 
              onChange={handleChange} 
              type="text" 
              className="outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"
            />
          </div>

          <div className="inputContainer flex flex-col gap-2 w-full">
            <h3 className="text-lg font-semibold">Task Description :</h3>
            <textarea 
              required 
              value={task.description} 
              name='description' 
              onChange={handleChange} 
              rows={5} 
              className="outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"
            ></textarea>
          </div>

          <div className="inputContainer flex flex-col gap-2 w-full">
            <h3 className="text-lg font-semibold">Assigned User :</h3>
            <select 
              required 
              value={task.user_ID} 
              name='user_ID' 
              onChange={handleSelect} 
              className='duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg'
            >
              <option value="" className=''>Select User</option>
              {projectUsers.length > 0 ? (
                projectUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.type})
                  </option>
                ))
              ) : (
                <option disabled>Select a project first</option>
              )}
            </select>
          </div>

          <div className="inputContainer flex flex-col gap-2 w-full">
            <h3 className="text-lg font-semibold">Task Status :</h3>
            <select 
              required 
              value={task.status} 
              name='status' 
              onChange={handleChange} 
              className='duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg'
            >
              <option value="" className=''>Select Status</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="inputContainer flex flex-col gap-2 w-full">
            <h3 className="text-lg font-semibold">Due Date :</h3>
            <input 
              value={task.dueDate} 
              name='dueDate' 
              onChange={handleChange} 
              type="date" 
              className="outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg"
            />
          </div>

          <button 
            disabled  ={loading}
            className='bg-[rgba(3,125,255,0.4)] hover:bg-[#027bfe] py-[10px] cursor-pointer duration-300 rounded-lg flex-1'
            type='submit'
          >
            {loading ? 'Creating...' : 'Add Task'}
          </button>
        </>
      )}
    </form>
  )
}
