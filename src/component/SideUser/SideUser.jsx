import React from 'react'
import UserList from '../UserList/UserList'
export default function SideUser({tempUsers,ID,loadChat,setID}) {
  return (
   <div className="sideUser  
  p-[15px_5px_0px_20px]
  w-[20%]
  h-[calc(100dvh-52px)]
  overflow-y-auto
  [scrollbar-width:thin]
  [scrollbar-color:var(--input-background)_transparent]
  [scroll-behavior:smooth]
  
  /* Webkit scrollbar styles */
  [&::-webkit-scrollbar]:w-[2px]
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-track]:rounded-[4px]
  [&::-webkit-scrollbar-thumb]:bg-[#888]
  [&::-webkit-scrollbar-thumb]:rounded-[4px]
  [&::-webkit-scrollbar-thumb:hover]:bg-[#555]
  
  /* Mobile responsive styles */
  max-[550px]:h-auto
  max-[550px]:w-full">
           <h3 className='text-[#e0e0e0] font-[Lato] text-[18px] mb-[6px]'>List of Students</h3>
           <UserList tempUsers={tempUsers} ID={ID} loadChat={()=>{loadChat()}} setID={()=>{setID()}} />
       </div>
  )
}
