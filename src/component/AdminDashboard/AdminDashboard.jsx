import { useEffect, useState } from "react"
import DashboardHeader from "../Dashboard-header/Dashboard-header"
import StatsCards from "../StatsCards/StatsCards"
import DashboardChart from "../Dashboard-chart/Dashboard"
import { getData } from "./scripts"

export default function AdminDashboard() {
  const [date, setDate] = useState("")
  const [dashboardData, setDashboardData] = useState({
    projectCount: 0,
    studentCount: 0,
    tasksCount: 0,
    finishedProjectsCount: 0,
  })
  
  useEffect(() => {



    let d=new Date();
    const options = {
  weekday: 'long', 
  year: 'numeric', 
  month: 'long',  
  day: 'numeric',  
  hour: 'numeric', 
  minute: 'numeric',
  second: 'numeric',
  hour12: true,    
  };

const formatter = new Intl.DateTimeFormat('en-US', options);
const currentDate = formatter.format(d);
setDate(currentDate);

  // Set interval to update date every second
  const intervalId = setInterval(() => {
    const d = new Date();
    const currentDate = formatter.format(d);
    setDate(currentDate);
  }, 1000); // 1000 ms = 1 second


    // Get data from localStorage
    getData().then(data => {
      setDashboardData(data);
    });
  }, [])

  return (
    <div className="flex flex-col gap-2.5 w-4/5 h-full mx-auto p-1.5">
      <DashboardHeader title="Welcome to the Task Management System" date={date} />
      <StatsCards data={dashboardData} />
      <DashboardChart data={dashboardData} />
    </div>
  )
}
