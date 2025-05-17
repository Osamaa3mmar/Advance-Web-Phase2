import React from 'react'
import Message from '../Message/Message'


export default function ChatBox({message, chatReceverName,Messages,msg,setmsg}) {

 
 const container_style=`flex flex-col
  bg-[#2a2a2a]
  w-[90%]
  h-[70dvh]
  border-2 border-[#444444]
  rounded-[10px]
  justify-between
  overflow-hidden`;
  const messages_info_style=`flex items-center font-[Lato] text-[18px] font-semibold text-[#e0e0e0] bg-[#1e1e1e] !px-[10px] !py-[8px]`;
  const messages_style=`bg-[#2a2a2a]
  flex-grow
  overflow-y-auto
  flex flex-col
  gap-[6px]
  !px-[8px] !py-[10px]
  [scrollbar-width:thin]
  [scrollbar-color:#333_transparent]
  [scroll-behavior:smooth]
  
  /* Webkit scrollbar styles */
  [&::-webkit-scrollbar]:w-[5px]
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-[#333]
  [&::-webkit-scrollbar-thumb]:rounded-[4px]`

  const msg_form_style=`  bg-[#1e1e1e]
  flex
  items-center
  w-full
  !px-[20px] !py-[10px]
  gap-[15px]
  max-[550px]:flex-col
  max-[550px]:p-[4px]
  `

  const msg_input_style=` 
    outline-none
    border-2 border-[#444444]
    text-[#e0e0e0]
    font-[Lato]
    bg-[#333]
    text-[16px]
    !px-[10px] !py-[8px]
    rounded-[6px]
    max-[550px]:w-full
    max-[550px]:flex-grow
    grow
    `
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setmsg((prevMsg) => {
        return newValue;
    });
};
  return (
    <div className=" chat-box flex items-center justify-center w-full h-full bg-[#1e1e1e] !p-[30px]">
    <div className={"chat-container "+container_style}>
    <div className="messages-box flex-grow h-full flex flex-col overflow-y-auto">
    <div className={"message-info "+messages_info_style}>
    <h3 className='capitalize'>{chatReceverName}</h3>
    </div>
    <div className={"messages"+messages_style}>
    {
      
        Messages?Messages.map((message,index)=>{return <Message key={message.id || index} message={message}/>}):" "
        
    

    }
    </div>
    </div>
    <div className={"msg-form "+msg_form_style} >
    <input className={msg_input_style} value={msg}   onChange={ handleInputChange}  placeholder="Type Your Message . . . " type="text" required/>
    <button className={msg_input_style+"  max-w-[100px] flex-grow cursor-pointer"} onClick={()=>{message()}} > send</button>
    </div>
    </div>
    </div>

  )
}
