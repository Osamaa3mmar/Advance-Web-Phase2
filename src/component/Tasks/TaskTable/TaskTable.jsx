import TableHeader from "./TableHeader"

export default function TaskTable(){
    return(
        <table class="w-full border-collapse mt-5" style={{marginTop: "10px"}}>
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
        <tbody id="taskTableBody">
          {/* <!-- Table rows will be populated dynamically here --> */}
        </tbody>
      </table>
    )
}