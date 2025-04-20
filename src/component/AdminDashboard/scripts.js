export function getData(){


  return{
      
      "projectCount":JSON.parse(localStorage.getItem("projects"))?JSON.parse(localStorage.getItem("projects")).length:0,
      "StudentCount":JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")).filter(user=>user.role!="admin").length:0,
      "TasksCount":JSON.parse(localStorage.getItem("Tasks"))?JSON.parse(localStorage.getItem("Tasks")).length:0,
      "FinishedProjrctsCount":JSON.parse(localStorage.getItem("projects"))?JSON.parse(localStorage.getItem("projects")).filter(t=>getPercent(t.title)==100).length:0
  }
}


function getPercent(project) {
  let Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  let count = 0;
  let count_of_completed = 0;

  Tasks = Tasks.filter((t) => {
    return t.project == project;
  });
  count = Tasks.length;
  Tasks = Tasks.filter((t) => t.status == "Completed");
  count_of_completed = Tasks.length;
  if (count == count_of_completed) return 100;
  return Math.round((count_of_completed / count) * 10000) / 100;
}
  