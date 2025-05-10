import { Outlet,useLocation,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// import "./style.css"
import { useRef, useState } from "react";
export default function MainLayout() {
  const navigate = useNavigate("");
  const [pageId,setpageId]=useState("home");
  const user=JSON.parse(localStorage.getItem("currentUser"));
  const logout=()=>{
    setpageId("login");
    navigate("/", { state: { from: "/" } });

    localStorage.removeItem("currentUser");


}
const {pathname}=useLocation()
const sidebarRef = useRef(null);
const cretRef = useRef(null);
  
const toggleSideBar = () => {


  if (sidebarRef.current && cretRef.current) {
    sidebarRef.current.classList.toggle('w-[77px]');
    sidebarRef.current.classList.toggle('w-[220px]');
    cretRef.current.classList.toggle('fa-caret-left');
    cretRef.current.classList.toggle('fa-caret-right');
  }
};
  const commonClasses = "outline outline-2   text-[#e0e0e0] flex items-center gap-[15px] font-lato tracking-px text-[18px] !px-[15px] !py-[10px] rounded-[6px] transition duration-400 cursor-pointer overflow-hidden hover:outline-[#017cff80] ";
  const uniqueToNavbar = "bg-[#333] outline-transparent";
  const uniqueToActiveNav = "bg-[#017bff] font-[700] outline-[#017cff80]";

  

  return (
      <div  className="app-layout flex flex-col items-start h-100dvh">
        <div className=" top-bar flex items-center justify-end w-full bg-[#1e1e1e] !p-[6px_10px] gap-5 border-b-3 border-[#464646]">
            <div className=" name flex items-center gap-[10px] ">
                <div className=" role-tag !px-[6px] !py-[4px] rounded-[40px] bg-[#87cfeb1a] text-[#87ceeb] outline outline-2 outline-[#87cfeb80] font-lato capitalize text-[12px] font-[600] tracking-[1px]">{user!=null?user.role:""}</div>
                <h3 className="username text-[#e0e0e0] font-lato text-[24px] !py-[4px] capitalize">{user!=null?user.username:""} </h3>
            </div>
            <button className="text-[#e0e0e0] font-lato !px-[25px] !py-[6px] outline-none  text-[16px] font-[600] cursor-pointer bg-[#de0101] rounded-[4px] transition duration-300 hover:bg-[#99AABB]" onClick={()=>{logout()}}>Logout</button>
        </div>
        <div className="content flex w-full">
        <div ref={sidebarRef} className=" sidebar max-[770px]:w-[70px] w-[220px] bg-gradient-to-t from-[#303030] to-[#1e1e1e] min-h-[calc(100dvh-52px)] overflow-hidden transition duration-300">
            <div onClick={()=>{toggleSideBar()}} className="control-sidebar m-auto mt-3 rounded-full bg-[#333] cursor-pointer transition-[200ms] hover:outline hover:outline-2 hover:outline-[rgba(1,124,255,0.5)] max-[770px]:hidden  flex text-[#e0e0e0]  w-[30px] h-[30px]  items-center justify-center">
            <i  ref={cretRef} className="cret fa-solid fa-caret-left"></i>
        </div>
            <ul className="flex flex-col !p-[20px_15px] m-0 list-none gap-[10px] overflow-hidden">
            <Link  to="home"  onClick={()=>{setpageId("home")}} className={ commonClasses+ (pathname.split("/")[2]=='home'?uniqueToActiveNav: uniqueToNavbar) } ><i className="fa-solid fa-house"></i> Home</Link>
            <Link  to="projects" onClick={()=>{setpageId("projects")}} className={commonClasses+ (pathname.split("/")[2]=='projects'?uniqueToActiveNav: uniqueToNavbar)} ><i className="fa-solid fa-diagram-project"></i> Projects</Link>
            <Link  to="tasks" onClick={()=>{setpageId("tasks")}} className={commonClasses + (pathname.split("/")[2]=='tasks'?uniqueToActiveNav: uniqueToNavbar) } ><i className="fa-solid fa-list-check"></i> Tasks</Link>
            <Link  to="chat" onClick={()=>{setpageId("chat")}} className={commonClasses + (pathname.split("/")[2]=='chat'?uniqueToActiveNav: uniqueToNavbar)} ><i className="fa-solid fa-message"></i> Chat</Link>
            </ul>
        </div>
        <div className="page bg-[#333] grow">
        <Outlet/>
        </div>
    </div>
    </div>
      
  
  )
}




