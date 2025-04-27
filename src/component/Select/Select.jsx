import style from './style.module.css';
export default function Select({searchTerm}) {
  const handleChange=(e)=>{
    console.log(e.target.value);
    searchTerm({type:'status',status:e.target.value})
  }
  return (
    <select onChange={handleChange} className={style.select+ ' w-full m-auto  md:w-[100px] '}>
      <option value={''} className={style.option}>All</option>
      <option value="inProgress" className=' '>In Progress</option>
          <option value="completed" className=' '>Completed</option>
          <option value="pending" className=' '>Pending</option>
          <option value="onHold" className=' '>On Hold</option>
          <option value="cancelled" className=' '>Cancelled</option>
    </select>
  )
}
