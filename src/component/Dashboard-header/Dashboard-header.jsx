export default function DashboardHeader({ title, date }) {
    return (
      <div className="w-full flex flex-row">
        <span className="text-blue-500 text-left w-1/2">{title}</span>
        <span className="w-1/2 text-right text-white">{date}</span>
      </div>
    )
  }
  