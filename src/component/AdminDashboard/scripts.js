import axios from 'axios';

export async function getData() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    return {
      studentCount: 0,
      projectCount: 0,
      tasksCount: 0,
      finishedProjrctsCount: 0
    };
  }
  


  return{
    "studentCount": await getStudentCount(token),
    "projectCount":await getProjectCount(token),
    "tasksCount":await getTaskCount(token),
    "finishedProjrctsCount":await getFinishedProjectCount(token)
  }
}

async function getStudentCount(token) {
  const query = `query Users {
    users {
      id
      type
    }
  }`;

  const response = await axios.post(
    "http://localhost:4001/graphql",
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );

  const users = response.data?.data?.users || [];
  
  return (users.filter(user => user.type === "student").length);
}

async function getProjectCount(token) {
  const query = `query Projects {
    projects {
      id
    }
  }`;

  const response = await axios.post(
    "http://localhost:4001/graphql",
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );

  return response.data?.data?.projects?.length || 0;
}

async function getTaskCount(token) {
  const query = `query Tasks {
    tasks {
      id
    }
  }`;

  const response = await axios.post(
    "http://localhost:4001/graphql",
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );

  return response.data?.data?.tasks?.length || 0;
}

async function getFinishedProjectCount(token) {
  const query = `query Projects {
    projects {
      id
      status
    }
  }`;

  const response = await axios.post(
    "http://localhost:4001/graphql",
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );
  const projects = response.data?.data?.projects || [];

  let counter=0;

  for(let i=0;i< projects.length;i++)
    if(await isCompletedProject(projects[i],token))counter++;

  console.log(counter)

  return counter;
}
async function  isCompletedProject(project,token){

  const query = `
  query ProjectTasks {
    projectTasks(projectId: "${project.id}") {
        id
        status
    }
}`;


  const response = await axios.post(
    "http://localhost:4001/graphql",
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );
  const projectTasks = response.data?.data?.projectTasks || [];
  if(projectTasks.length==0) return false
  for(let task of projectTasks){
    if (task.status != "completed"){
      return false;
    }
  }
  return true;
}