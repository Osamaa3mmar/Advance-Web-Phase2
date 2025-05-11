import { useEffect, useState } from "react"
import DashboardHeader from "../Dashboard-header/Dashboard-header"


export default function UserDashboard() {
    const [date, setDate] = useState("")
    useEffect(() => {
      // Set current date
      const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      setDate(currentDate)
    }, [])
  
    return (
      <div className="flex flex-col gap-2.5 w-4/5 h-full mx-auto p-1.5">
        <DashboardHeader title="Welcome to the Task Management System" date={date} />
        
    <h1 id="Welcome_msg  text-[#e0e0e0] col-span-4 text-[8vw] text-center">Welcome {JSON.parse(localStorage.getItem("currentUser")).username}</h1>
   
      </div>
    )
}
