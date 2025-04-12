import TaskHeader from "./TaskHeader/TaskHeader"
import TaskTable from "./TaskTable/TaskTable"
import TaskModal from "./TaskModal/TaskModal"

export default function Tasks(){
    return(
        <div className="w-[95%] h-[95%] p-[1px] m-auto flex flex-col justify-start items-center relative overflow-auto">
            <TaskHeader />
            <TaskTable  />
            {/* <TaskModal  /> */}
        </div>
    )
}