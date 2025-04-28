import TableRow from './TableRow'
import TableHead from './TableHead'
import style from './style.module.css'
export default function TaskTable({tasks,trig}) {
  return (
    <div className={" overflow-x-auto pb-[10px]  "+style.scroll }>
    <table   className=' bg-[#1e1e1e] shadow-lg text-white'>
        <thead className=' border-[#3f3f3f] border-b-4'>
            <tr className='  '>
            <TableHead name={"Task ID"} num={"10%"}/>
            <TableHead name={"Project"} num={"20%"}/>
            <TableHead name={"Task Name"} num={"10%"}/>
            <TableHead name={"Description"} num={"30%"}/>
            <TableHead name={"Assigned Student"} num={"10%"}/>
            <TableHead name={"Status"} num={"6%"}/>
            <TableHead name={"Due Date"} num={"14%"}/>
            </tr>
        </thead>
        <tbody>
        {tasks?.map((task)=>{
            return <TableRow trig={trig} key={task.id} {...task}/> 
        })}
      </tbody>
    </table>
    </div>
  )
}
