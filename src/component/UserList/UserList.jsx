import { useState, useEffect } from "react";



  
const UserList = ({ tempUsers,setID,ID,loadChat}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const liStyle=`bg-[#444444] w-full text-[#e0e0e0] font-[Lato)] text-[14px] !px-[8px] !py-[10px] rounded-[4px] 
              capitalize transition-all duration-200 cursor-pointer hover:outline hover:outline-2 
              hover:outline-[rgba(1,124,255,0.5)]    max-[550px]:w-auto `
    useEffect(() => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    }, []);
  
    
const getCurrentUser=(id)=>{
  
    const userList =document.querySelector(".user-list");
    const tempUsers=JSON.parse(localStorage.getItem('users'));
    const current=JSON.parse(localStorage.getItem("currentUser"));
    let recever=null;
    setID(id);
    tempUsers.map((user)=>{
        if(user.id!=JSON.parse(localStorage.getItem('currentUser')).id){
            user.id==id?recever=user:null;
          
        }
    
    }).join('')
    localStorage.setItem('messageHelper', JSON.stringify({current,recever}));
    loadChat();
  }
  
    return (
      <ul className="user-list list-none flex flex-col items-center gap-1.5 w-full">
        {tempUsers && currentUser ? (
          tempUsers.filter(
              (user) =>
                user.id !== currentUser.id &&
                (currentUser.role === "admin" || user.role === "admin")
            )
            .map((user) => (
              <li key={user.id} className={liStyle+(user.id==ID?" bg-[#017bff] font-semibold outline outline-2 outline-[rgba(1,124,255,0.5)]":'')}  onClick={() =>{getCurrentUser(user.id)}}>
                {user.username}
              </li>
            ))
        ) : (
          <li>Empty</li>
        )}
      </ul>
    );
  };

export default UserList;