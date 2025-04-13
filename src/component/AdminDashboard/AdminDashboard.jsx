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
    // Set current date
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setDate(currentDate)

    // Get data from localStorage
    setDashboardData(getData())
  }, [])

  return (
    <div className="flex flex-col gap-2.5 w-4/5 h-full mx-auto p-1.5">
      <DashboardHeader title="Welcome to the Task Management System" date={date} />
      <StatsCards data={dashboardData} />
      <DashboardChart data={dashboardData} />
    </div>
  )
}
