import React from 'react'
import ChatBoxStart from '../chatBoxStart/ChatBoxStart'
import ChatBox from '../ChatBox/ChatBox'

export default function ChatArea({ID,message,chatReceverName,Messages, msg, setmsg}) {

  return (
    <div className="chat-area grow">
       {ID==-1?<ChatBoxStart/>:<ChatBox message={()=>{message()}} chatReceverName={chatReceverName} Messages={Messages} msg={msg} setmsg={setmsg}/>}

       
    </div>
  )
}
