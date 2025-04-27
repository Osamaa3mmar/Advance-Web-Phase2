
export default function TableRow({id,name,project,description,student,status,dueDate}) {
  return (
    <tr className="border-[#3f3f3f] border-b-1">
      <td className="px-4 py-2 w-[10%]">{id}</td>
      <td className="px-4 py-2 w-[20%]">{project.title}</td>
      <td className="px-4 py-2 w-[10%]">{name}</td>
      <td className="px-4 py-2 w-[30%]">{description}</td>
      <td className="px-4 py-2 w-[10%]">{student.username}</td>
      <td className="px-4 py-2 w-[6%]">{status}</td>
      <td className="px-4 py-2 w-[14%]">{dueDate}</td>
    </tr>
  )
}
