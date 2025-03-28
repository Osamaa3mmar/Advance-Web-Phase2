import React from 'react'

export default function FormGroup(props) {
  return (
    <div className="w-full flex flex-col gap-[10] mb-10 text-[#e0e0e0] " >
    <label htmlFor={`login-${props.id}`} className="text-[24px] font-[600 Lato] tracking-[1px] cursor-pointer capitalize">{props.name}</label>
    <input value={props.value} onChange={props.onChange} required type={props.id}  className="outline-none  bg-[#333] color-[#e0e0e0] text-[22px]  rounded-[8px] border-[2px]  border-[#444444] flex-grow flex-shrink  !p-[10px] " id={`login-${props.id}`}/>
</div>

  )
}
