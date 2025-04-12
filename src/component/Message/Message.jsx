import React from 'react'

export default function Message({message}) {
    const messageHelper=JSON.parse(localStorage.getItem("messageHelper"));

    const message_style=
    ` text-[var(--text)]
      bg-[var(--background)]
      w-fit
      px-2 py-1         <!-- equivalent to padding: 4px 8px -->
      max-w-[170px]
      rounded-[6px]
      font-[var(--font)]
      border border-[var(--background)]
      flex flex-col
      gap-1   `;

    // const sender_style=
  return (
    <div className={"message  "+ message_style + (message.sender.id==messageHelper.current.id?"self-end":"  ")}>
    <p className="msg-name capitalize text-[10px] font-[600]">{message.sender.username}</p>
    <p className="msg-content">{message.content}</p>
    </div>

  )
}
