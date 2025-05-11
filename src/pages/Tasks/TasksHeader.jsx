import Button from "../../component/Button/Button";
import style from './../../component/Select/style.module.css'
import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
export const TasksHeader=({setModal})=>{

const {user}=useContext(CurrentUserContext);

    return(<div className=" flex flex-wrap gap-2.5 justify-between items-center">
        
         <select  className={style.select+ ' w-full   md:w-[100px] '}>
              <option value={''} className={style.option}>All</option>
              <option value="inProgress" className=' '>In Progress</option>
                  <option value="completed" className=' '>Completed</option>
                  <option value="pending" className=' '>Pending</option>
                  <option value="onHold" className=' '>On Hold</option>
                  <option value="cancelled" className=' '>Cancelled</option>
            </select>
            {user?.role=='admin'?
        <Button type={"primary"} onClick={()=>{setModal(true)}} text={"Create A New Task"}/>
            
            :''}
    </div>);
}


export default TasksHeader;