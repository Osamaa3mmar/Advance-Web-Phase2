import TableHeader from "./TableHeader";
import TableData from "./TableData";

export default function TaskTable({ tasks }) {
  return (
    <table className="w-full border-collapse mt-5" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <TableHeader>Task ID</TableHeader>
          <TableHeader>Project</TableHeader>
          <TableHeader>Task Name</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Assigned Student</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Due Date</TableHeader>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="text-center text-white border-t border-gray-700">
            <TableData>{task.id}</TableData>
            <TableData>{task.project}</TableData>
            <TableData>{task.taskName}</TableData>
            <TableData>{task.description}</TableData>
            <TableData>{task.assigned}</TableData>
            <TableData>{task.status}</TableData>
            <TableData>{task.dueDate}</TableData>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
