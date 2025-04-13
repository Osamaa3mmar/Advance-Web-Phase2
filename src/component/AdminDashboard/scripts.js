export function getData() {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]")
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const tasks = JSON.parse(localStorage.getItem("Tasks") || "[]")
  
    // Calculate finished projects
    const finishedProjects = projects.filter((project) => getPercent(project.title) === 100).length
  
    return {
      projectCount: projects.length,
      studentCount: users.filter((user) => user.role !== "admin").length,
      tasksCount: tasks.length,
      finishedProjectsCount: finishedProjects,
    }
  }
  
  // Helper function for calculating project completion percentage
  export function getPercent(projectTitle) {
    // Implement your logic to calculate project completion percentage
    // For now, returning a mock value
    return Math.floor(Math.random() * 101)
  }
  