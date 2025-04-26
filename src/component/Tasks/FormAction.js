export function resetForm(){
    document.getElementById('taskName').value=''
    document.getElementById('description').value=''
    document.getElementById('dueDate').value=''
    
}

export function fetch_projects(){

    return localStorage.getItem("projects")
    
}
export function fetch_users(){
    return localStorage.getItem("users")
}
  
export function init_project_list(){
    const projectElement = document.querySelector("#project");
    if (!projectElement) {
        console.warn("Project select element not found!");
        return;
    }

    projectElement.innerHTML = "";

    let currStu = JSON.parse(localStorage.getItem("currentUser"));
    let project_list = JSON.parse(fetch_projects());

    if (!project_list) {
        console.warn("No projects found in localStorage!");
        return;
    }

    project_list = project_list.filter(project => 
        currStu.role === "admin" || project.students.includes(currStu.username)
    );

    for (let i = 0; i < project_list.length; i++) {
        projectElement.innerHTML += `
            <option value=${i}>${project_list[i].title}</option>
        `;
    }
}



export function init_users_list(i){
    let currStu=JSON.parse(localStorage.getItem("currentUser"))

    if(i==undefined)
        return
    let project_list=JSON.parse(fetch_projects());
    
    let users=currStu.role=="admin"?project_list[i].students:[currStu.username]
    
        document.querySelector("#assigned").innerHTML=""
        
        
        for(let i=0;i<users.length;i++){
            document.querySelector("#assigned").innerHTML+=`
            <option value=${users[i]} >${users[i] } </option>
        `
        }
        
    
}
export function openModal() {
    const modal = document.getElementById('taskModal');

    if (!modal) {
        alert('Modal not found in DOM. Make sure it is rendered before calling openModal().');
        console.warn("Modal not found!");
        return;
    }

    init_project_list();
    init_users_list(0);
    modal.style.display = 'flex';
}


export function closeModal(){
    const modal = document.getElementById('taskModal');
    modal.style.display='none';
}

// Close modal when clicking outside
export function resetForm(){
    document.getElementById('taskName').value=''
    document.getElementById('description').value=''
    document.getElementById('dueDate').value=''
    
}

export function fetch_projects(){

    return localStorage.getItem("projects")
    
}
export function fetch_users(){
    return localStorage.getItem("users")
}
  
export function init_project_list(){
    const projectElement = document.querySelector("#project");
    if (!projectElement) {
        console.warn("Project select element not found!");
        return;
    }

    projectElement.innerHTML = "";

    let currStu = JSON.parse(localStorage.getItem("currentUser"));
    let project_list = JSON.parse(fetch_projects());

    if (!project_list) {
        console.warn("No projects found in localStorage!");
        return;
    }

    project_list = project_list.filter(project => 
        currStu.role === "admin" || project.students.includes(currStu.username)
    );

    for (let i = 0; i < project_list.length; i++) {
        projectElement.innerHTML += `
            <option value=${i}>${project_list[i].title}</option>
        `;
    }
}



export function init_users_list(i){
    let currStu=JSON.parse(localStorage.getItem("currentUser"))

    if(i==undefined)
        return
    let project_list=JSON.parse(fetch_projects());
    
    let users=currStu.role=="admin"?project_list[i].students:[currStu.username]
    
        document.querySelector("#assigned").innerHTML=""
        
        
        for(let i=0;i<users.length;i++){
            document.querySelector("#assigned").innerHTML+=`
            <option value=${users[i]} >${users[i] } </option>
        `
        }
        
    
}
export function openModal() {
    const modal = document.getElementById('taskModal');

    if (!modal) {
        alert('Modal not found in DOM. Make sure it is rendered before calling openModal().');
        console.warn("Modal not found!");
        return;
    }

    init_project_list();
    init_users_list(0);
    modal.style.display = 'flex';
}

export function closeModal(){
    const modal = document.getElementById('taskModal');
    modal.style.display='none';
}

export function saveTask() {
    let currStu = JSON.parse(localStorage.getItem("currentUser"));
    let project_list = JSON.parse(fetch_projects());
    
    // Filter projects based on the user's role
    project_list = project_list.filter((project) => currStu.role == "admin" || project.students.includes(currStu.username));

    let val = document.getElementById('project').value;

    // Generate a timestamp-based ID
    const timestamp = Date.now(); // Current timestamp (milliseconds since Unix epoch)

    // Create a new task object with the timestamp as the unique ID
    let new_task = build_task({
        id: timestamp, // Use the timestamp as the task ID
        project: project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "Pending",
        dueDate: document.getElementById('dueDate').value
    });

    let tableBody = document.querySelector("#taskTableBody");
    tableBody.innerHTML += new_task.outerHTML;

    // Update the global task list
    globalTask.push({
        id: timestamp, // Use the timestamp as the task ID
        project: project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "Pending",
        dueDate: document.getElementById('dueDate').value
    });

    // Update the tasks array
    tasks.push({
        id: timestamp, // Use the timestamp as the task ID
        project: project_list[val].title,
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        assigned: document.getElementById('assigned').value,
        status: "Pending",
        dueDate: document.getElementById('dueDate').value
    });

    // Save the updated global task list to localStorage
    commit_tasks(globalTask);

    closeModal();
    resetForm();
}
