import axios from 'axios';
import React,{useEffect,useState,useContext} from 'react'
import { CurrentUserContext } from '../../Context/CurrentUserContext';


export default  function Message({message}) {

let [sender,setSender]=useState(null);
  useEffect(()=>{
    getUser(message.sender_ID).then(data=>{setSender(data)}).catch(error=>{console.log("error",error)});
  },[])

  async function getUser(id){
    const token = localStorage.getItem('token');

    const query=`query User {
    user(id: "${id}") {
        id
        username
        type
        uid
    } 
}`;
const user=axios.post("http://localhost:4001/graphql",{query},
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  );
// const userData=(await user);
    return (await user).data.data.user;
}


    const message_style=
    ` text-[var(--text)]
      bg-[var(--background)]
      w-fit
      px-2 py-1        
      max-w-[170px]
      rounded-[6px]
      font-[var(--font)]
      border border-[var(--background)]
      flex flex-col
      gap-1   `;

    
      const {user}=useContext(CurrentUserContext);
  return (
    <div className={"message  "+ message_style + (message.sender_ID==user?.id?"self-end":"  ")}>
     <p className="msg-name capitalize text-[10px] font-[600]">{sender?.username}</p>
     <p className="msg-content">{message.payload}</p>
    </div>
  

  )
}
