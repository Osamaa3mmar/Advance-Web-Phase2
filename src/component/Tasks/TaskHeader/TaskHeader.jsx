
export default function TaskHeader(){
    const colors = {
        charcoal: '#383434',
        neonGreen: '#22c55e',
        darkBg: '#1e1e1e', 
        cardDark: '#0f0f0f', 
        forBTN: '#50ac4c',
    };

    return(
        <div className="mt-10 flex flex-wrap
        justify-between items-center  w-full" style={{padding :"20px"}}>
          <div className=" flex flex-wrap
          items-center gap-2">
            <label for="sortSelect" className="text-white">Sort By:</label>
              <select id="sortSelect" onchange="SortByHandler(event) "
                  className="text-white py-2 px-3 border border-gray-600 rounded-md text-[clamp(10px,1vw,20px)] cursor-pointer" style={{backgroundColor : colors.charcoal}}>
                  <option value="status">Task Status</option>
                  <option value="dueDate">Due Date</option>
                  <option value="project">Project</option>
                  <option value="assigned">Assigned Student</option>
              </select>
              </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
            onclick="openModal()"
            style={{padding :"5px" }}>
            Create a New Task
          </button>
        </div>
    )
}