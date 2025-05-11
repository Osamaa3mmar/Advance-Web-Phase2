import style from './style.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
export default function TableRow({refreshTasks, id, name, description, status, dueDate, project_ID, user_ID}) {
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [userName, setUserName] = useState('');
  
  // Fetch project and user details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch project details
        if (project_ID) {
          const projectQuery = `query Project {
            project(id: ${project_ID}) {
              name
            }
          }`;
          
          const projectResponse = await axios.post("http://localhost:4001/graphql", {
            query: projectQuery
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (projectResponse.data.data && projectResponse.data.data.project) {
            setProjectName(projectResponse.data.data.project.name);
          }
        }
        
        // Fetch user details
        if (user_ID) {
          const userQuery = `query User {
            user(id: ${user_ID}) {
              username
            }
          }`;
          
          const userResponse = await axios.post("http://localhost:4001/graphql", {
            query: userQuery
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (userResponse.data.data && userResponse.data.data.user) {
            setUserName(userResponse.data.data.user.username);
          }
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    
    fetchDetails();
  }, [project_ID, user_ID]);
  const toggleStatus = async () => {
    setLoading(true);
    
    try {
      // Determine the next status in the cycle
      let newStatus;
      if (status === "inProgress") {
        newStatus = "completed";
      } else if (status === "completed") {
        newStatus = "pending";
      } else if (status === "pending") {
        newStatus = "inProgress";
      }
      
      // Update task status using GraphQL mutation
      const query = `mutation UpdateTask {
        updateTask(id: "${id}", input: {
          status: ${newStatus}
        }) {
          id
          status
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
      
      if (data.data && data.data.updateTask) {
        // Refresh the task list to show the updated status
        refreshTasks();
      } else {
        const errorMessage = data.errors?.[0]?.message || "Failed to update task status";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className={" border-[#3f3f3f] border-b-1 "+style.hoverTabelRow}>
      <td className="px-4 py-2 w-[10%]">{id}</td>
      <td className="px-4 py-2 w-[20%]">{projectName}</td>
      <td className="px-4 py-2 w-[10%]">{name}</td>
      <td className="px-4 py-2 w-[30%]">{description}</td>
      <td className="px-4 py-2 w-[10%]">{userName}</td>
      <td 
        className={
          (status === "pending" ? `${style.taskStatusBtnYellow}` :
          status === "completed" ? `${style.taskStatusBtnGreen}` :
          status === "inProgress" ? `${style.taskStatusBtnBlue}` :
          "bg-teal-500") + 
          " px-4 py-2 w-[6%] "+ `${style.taskStatusBtn}`
        }
        onClick={!loading ? toggleStatus : undefined}
        style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {status}
      </td>
      <td className="px-4 py-2 w-[14%]">{dueDate ? new Date(parseInt(dueDate)).toLocaleDateString() : "N/A"}</td>
    </tr>
  )
}
