import React, { useState, useEffect } from "react";
import TaskHeader from "./TaskHeader/TaskHeader";
import TaskTable from "./TaskTable/TaskTable";
import TaskModal from "./TaskModal/TaskModal"; // if not already imported

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div className="w-[95%] h-[95%] p-[1px] m-auto flex flex-col justify-start items-center relative overflow-auto">
      <TaskHeader onAddClick={() => setShowModal(true)} />
      <TaskTable tasks={tasks} />
      {showModal && (
        <TaskModal
          setTasks={setTasks}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
