import React from 'react'

export default function FormGroup(props) {
  const colors = {
    charcoal: '#383434',
    neonGreen: '#22c55e',
    darkBg: '#1e1e1e', 
    cardDark: '#0f0f0f', 
    forBTN: '#50ac4c',
};
  return (
    <div className="space-y-2" >
      <label htmlFor={`login-${props.id}`} className="text-2xl block font-medium text-gray-400">{props.name}</label>
      <input disabled={props.loading} value={props.value} onChange={props.onChange} required type={props.id} 
      className="w-full px-3 py-2  border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neonGreen text-white"
      id={`login-${props.id}`}
      style={{backgroundColor : colors.charcoal , 
              marginBottom : "10px" ,
      }}/>
    </div>

  )
}
