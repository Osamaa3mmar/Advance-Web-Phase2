import React, { useState, useEffect } from "react";

export default function TaskModal({ setTasks, onClose }) {
  const colors = {
    charcoal: "#383434",
    neonGreen: "#22c55e",
    darkBg: "#1e1e1e",
    cardDark: "#0f0f0f",
    forBTN: "#50ac4c",
  };

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assigned, setAssigned] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      console.error("No currentUser found in localStorage.");
      return;
    }

    let projectList = JSON.parse(localStorage.getItem("projects")) || [];
    projectList = projectList.filter(
      (project) =>
        currentUser.role === "admin" ||
        project.students.includes(currentUser.username)
    );

    setProjects(projectList);
    setSelectedProjectIndex(0);

    if (projectList.length > 0) {
      const users =
        currentUser.role === "admin"
          ? projectList[0].students
          : [currentUser.username];
      setAvailableUsers(users);
      setAssigned(users[0]);
    }
  }, []);

  const handleSave = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const projectList = JSON.parse(localStorage.getItem("projects")) || [];
    const filteredProjects = projectList.filter(
      (project) =>
        currentUser.role === "admin" ||
        project.students.includes(currentUser.username)
    );
    const selectedProject = filteredProjects[selectedProjectIndex];

    const newTask = {
      id: Date.now(),
      project: selectedProject.title,
      taskName,
      description,
      assigned,
      status: "Pending",
      dueDate,
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks(updatedTasks); // 🧠 Important line to update UI
    onClose();
  };

  const handleProjectChange = (e) => {
    const index = parseInt(e.target.value);
    setSelectedProjectIndex(index);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const selected = projects[index];
    const users =
      currentUser.role === "admin"
        ? selected.students
        : [currentUser.username];
    setAvailableUsers(users);
    setAssigned(users[0]);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="p-6 rounded-lg w-11/12 max-w-lg mx-auto"
        style={{ backgroundColor: colors.darkBg }}
      >
        <form className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl">Create new Task</h1>
            <span
              onClick={onClose}
              className="text-white text-2xl cursor-pointer"
            >
              ×
            </span>
          </div>

          {/* Project Selection */}
          <div className="flex flex-col">
            <label htmlFor="project" className="text-gray-400 mb-1">
              Project:
            </label>
            <select
              id="project"
              value={selectedProjectIndex}
              onChange={handleProjectChange}
              className="text-white p-2 px-3 border border-gray-600 rounded-md"
              style={{ backgroundColor: colors.charcoal }}
            >
              {projects.map((project, index) => (
                <option key={project.id} value={index}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* Task Name */}
          <div className="flex flex-col">
            <label htmlFor="taskName" className="text-gray-400 mb-1">
              Task Name:
            </label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="text-white p-2 px-3 border border-gray-600 rounded-md"
              style={{ backgroundColor: colors.charcoal }}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-400 mb-1">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-white p-2 px-3 border border-gray-600 rounded-md"
              style={{ backgroundColor: colors.charcoal }}
              required
            ></textarea>
          </div>

          {/* Due Date */}
          <div className="flex flex-col">
            <label htmlFor="dueDate" className="text-gray-400 mb-1">
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="text-white p-2 px-3 border border-gray-600 rounded-md"
              style={{ backgroundColor: colors.charcoal }}
              required
            />
          </div>

          {/* Assigned */}
          <div className="flex flex-col">
            <label htmlFor="assigned" className="text-gray-400 mb-1">
              Assigned Student:
            </label>
            <select
              id="assigned"
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
              className="text-white p-2 px-3 border border-gray-600 rounded-md"
              style={{ backgroundColor: colors.charcoal }}
            >
              {availableUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleSave}
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
