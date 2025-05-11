export default function StatsCards({ data }) {
  
  return (
      <div className="flex justify-between h-fit w-full flex-wrap gap-1.5">
        <StatCard title="number of Projects" value={data.projectCount} />
        <StatCard title="number of Students" value={data.studentCount} />
        <StatCard title="number of Tasks" value={data.tasksCount} />
        <StatCard title="number of Finished Projects" value={data.finishedProjrctsCount} />
      </div>
    )
  }

  function StatCard({ title, value }) {
    return (
      <div className="w-24 h-fit p-2.5 bg-gray-800 text-center text-white shadow-lg">
        {title} <br /> <span>{value}</span>
      </div>
    )
  }