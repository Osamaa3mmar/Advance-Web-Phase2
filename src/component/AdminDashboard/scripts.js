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
  // const studentCount = await getStudentCount(token);
  // console.log(studentCount);


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
  console.log(users.filter(user => user.type === "student").length);
  
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
  return projects.filter(p => p.status === "completed").length;
}
