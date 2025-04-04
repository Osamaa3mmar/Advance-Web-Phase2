import React from 'react'

export default function SelectBox(props) {
  return (
    <div className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 text-neonGreen focus:ring-neonGreen border-gray-600 rounded"
            id="stay-signed" checked={props.checked} onChange={props.onChange} />
            <label htmlFor="stay-signed" >Stay Signed In</label>
        </div>
        
  )
}
