import React from 'react'

export default function SelectBox(props) {
  return (
    <div className="w-full flex w-fit flex-row items-center justify-start gap-[10px] font-[600] font-[24px] text-[#e0e0e0] w-fit">
            <input type="checkbox" className="w-fit"  id="stay-signed" checked={props.checked} onChange={props.onChange} />
            <label htmlFor="stay-signed" className='text-[24px]'>Stay Signed In</label>
        </div>
        
  )
}
