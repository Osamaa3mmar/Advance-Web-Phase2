
import { useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DashboardChart({ data }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    // Check screen size on mount
    setIsSmallScreen(window.innerWidth < 450)

    // Add resize listener
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 450)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Chart configuration
  const chartData = {
    labels: ["Projects", "Students", "Tasks", "Finished Projects"],
    datasets: [
      {
        label: "Count",
        data: [data.projectCount, data.studentCount, data.tasksCount, data.finishedProjectsCount],
        backgroundColor: ["rgba(41,63,62,255)", "rgba(37,57,71,255)", "rgba(75,65,42,255)", "rgba(55,44,75,255)"],
        borderColor: ["rgba(57,120,120,255)", "rgba(50,127,181,255)", "rgba(184,151,68,255)", "rgba(104,73,167,255)"],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    indexAxis: isSmallScreen ? "y" : "x",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-gray-500">Admin Dashboard Overview</span>
      <div className="w-full h-full flex justify-center">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
