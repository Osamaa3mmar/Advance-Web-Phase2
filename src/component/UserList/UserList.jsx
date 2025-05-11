import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";





const UserList = ({ tempUsers,setID,ID,loadChat,reciever,setReciever}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const liStyle=`bg-[#444444] w-full text-[#e0e0e0] font-[Lato)] text-[14px] !px-[8px] !py-[10px] rounded-[4px] 
              capitalize transition-all duration-200 cursor-pointer hover:outline hover:outline-2 
              hover:outline-[rgba(1,124,255,0.5)]    max-[550px]:w-auto `
              const {user}=useContext(CurrentUserContext);

              useEffect(() => {

        setCurrentUser(user);
    }, [user]);

    
const getCurrentUser=(id)=>{
  
    const userList =document.querySelector(".user-list");
    userList.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const current=user;
    
    let recever=null;
    setID(id);
    tempUsers?.map((user)=>{
        if(user.id!=current.id){
            user.id==id?recever=user:null;
          
        }
    
    }).join('')
    loadChat();
    setReciever(recever);
  }
  
    return (
      <ul className="user-list list-none flex flex-col items-center gap-1.5 w-full">
        {tempUsers && currentUser ? (
          tempUsers.filter(
              (user) =>
                user.id !== currentUser.id &&( (currentUser.role === "admin" || user.role === "admin")|| (currentUser.type === "admin" || user.type === "admin"))
               
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