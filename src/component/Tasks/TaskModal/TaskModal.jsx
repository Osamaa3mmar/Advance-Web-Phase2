import { useState } from "react";
import TaskInput from "../TaskInput/TaskInput";

export default function TaskModal({ closeModal, saveTask }) {
  const colors = {
    charcoal: '#383434',
    neonGreen: '#22c55e',
    darkBg: '#1e1e1e',
    cardDark: '#0f0f0f',
    forBTN: '#50ac4c',
  };

  // Example state
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assigned, setAssigned] = useState("pi");

  return (
    <div className="fixed inset-0  flex justify-center items-center " style={{backgroundColor:"rgba(0, 0, 0, 0.7)"}}>
      <div
        className="p-6 rounded-lg w-11/12 max-w-lg mx-auto "
        style={{ backgroundColor: colors.darkBg , padding: "20px" }}
      >
        <form className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl">Create new Task</h1>
            <span
              onClick={closeModal}
              className="text-white text-2xl cursor-pointer"
            >
              ×
            </span>
          </div>
          <div class="flex flex-col">
              <label for="project" class="text-gray-400 mb-1">Project:</label>
              <select id="project" onchange="init_users_list(this.value)" class=" text-white p-2 px-3 border border-gray-600 rounded-md text-[clamp(1vw,20px)]" style={{backgroundColor :colors.charcoal}}>
                {/* <!-- Project options go here --> */}
              </select>
            </div>
          {/* Task Name */}
          
          <TaskInput
            label="Task Name"
            id="taskName"
            required={true}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            colors={colors}
          />

          {/* Description (Can use another reusable component too) */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-400 mb-1">
              Description:
            </label>
            <textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-charcoal text-white p-2 px-3 border border-gray-600 rounded-md text-[clamp(1vw,20px)]"
              style={{ backgroundColor: colors.charcoal }}
            ></textarea>
          </div>

          {/* Due Date */}
          <TaskInput
            label="Due Date"
            id="dueDate"
            type="date"
            required={true}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            colors={colors}
          />

          {/* Assigned */}
          <div className="flex flex-col">
            <label htmlFor="assigned" className="text-gray-400 mb-1">
              Assigned Student:
            </label>
            <select
              id="assigned"
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
              className="bg-charcoal text-white p-2 px-3 border border-gray-600 rounded-md text-[clamp(1vw,20px)]"
              style={{ backgroundColor: colors.charcoal }}
            >
              <option value="pi">pi</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => saveTask({ taskName, description, dueDate, assigned })}
              className="w-full bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
