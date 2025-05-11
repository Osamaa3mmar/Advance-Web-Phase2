import { useContext, useEffect, useMemo, useState } from "react";
import { TasksHeader } from "./TasksHeader";
import Modal from "../../component/Modal/Modal";
import TaskForm from "./TaskForm";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import TaskTable from "./TaskTable";
import axios from "axios";
import { toast } from "react-toastify";

export default function Tasks() {
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(CurrentUserContext);

  // Fetch tasks from GraphQL API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const query = `query Tasks {
        tasks {
          id
          name
          dueDate
          status
          description
          project_ID
          user_ID
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

      if (data.data && data.data.tasks) {
        setTasks(data.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on user role and search term
  const filteredTasks = useMemo(() => {
    if (!tasks) return null;

    // Filter by user role
    let filteredByRole = tasks;
    if (user && user.role !== 'admin') {
      filteredByRole = tasks.filter(task => task.user_ID === user.id);
    }

    // Filter by search term (status)
    if (searchTerm) {
      return filteredByRole.filter(task => 
        task.status.toLowerCase() === searchTerm.toLowerCase()
      );
    }

    return filteredByRole;
  }, [tasks, user, searchTerm]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const modalToggle = () => {
    setModal(prev => !prev);
  }

  return (
    <div className="py-[3%] px-[4%] flex flex-col gap-4">
      <TasksHeader setModal={setModal} setSearchTerm={setSearchTerm} />
      <Modal onClose={modalToggle} status={modal} title={"Add New Task"}>
        <TaskForm closeForm={setModal} refreshTasks={fetchTasks} />
      </Modal>
      {loading ? (
        <div className="text-white text-center py-10">Loading tasks...</div>
      ) : (
        <TaskTable tasks={filteredTasks} refreshTasks={fetchTasks} />
      )}
    </div>
  )
}
